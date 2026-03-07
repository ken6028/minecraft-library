import { Screen_Home } from "./screen";
import { EX_Props } from "@/libs/ex_props";


export default async function Page() {
    const props = await EX_Props({});
    
    return (
        <Screen_Home {...props} />
    );
}
