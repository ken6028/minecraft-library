type RequestOptions<Query extends Record<string, unknown> | undefined, Body, ResponseBody, WrappedBody = ResponseBody> = {
    origin?: string;
    path?: string;
    query?: Query;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Body;
    responseWrap?: (body: ResponseBody) => WrappedBody;
}


type API_Response<ResponseData> = {
    success: boolean;
    data?: ResponseData;
}

export async function API_Request<Query extends Record<string, unknown> | undefined, Body, ResponseBody, WrappedBody>(options: RequestOptions<Query, Body, ResponseBody, WrappedBody> = {}): Promise<API_Response<WrappedBody>> {
    const { origin = window.location.origin, path = '', method = 'GET', query, body, responseWrap } = options;
    const url = new URL(path, origin);

    if (query) {
        Object.entries(query).forEach( ([key, value]) => {
            if (value !== undefined) {
                url.searchParams.append(key, String(value));
            }
        });
    }

    const fetchOptions: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) fetchOptions.body = JSON.stringify(body);

    console.log(`API Request: ${method} ${url.toString()}`);

    return await fetch(url.toString(), fetchOptions).then( async res => {
        console.log(`API Response: ${res.status} ${res.statusText}`);
        if (res.ok) {
            // レスポンスボディが空の場合（204 No Contentなど）の処理
            const contentType = res.headers.get('content-type');
            let responseData;
            
            if (res.status === 204 || !contentType || !contentType.includes('application/json')) {
                return { success: false}

            } else {
                responseData = await res.json();
                
            }
            
            return {
                success: true,
                data: responseWrap ? responseWrap(responseData) : responseData as WrappedBody
            };
        } else {
            return { success: false };
        }
    }).catch( err => {
        console.error('API Request Error:', err);
        return { success: false };
    });
    
}