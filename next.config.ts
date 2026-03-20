import type { NextConfig } from "next";
import { RemotePattern } from "next/dist/shared/lib/image-config";


const vblob_id = process.env.BLOB_READ_WRITE_TOKEN?.split("_")[3].toLowerCase();


const nextConfig: NextConfig = {
  /* config options here */

  
//   "turbopack": {
//     root: "../../"
//   },





    cacheComponents: true,



    images: {
        remotePatterns: [
            ...((
                vblob_id ? [
                    {
                        protocol: 'https',
                        hostname: `${vblob_id}.public.blob.vercel-storage.com`,
                        port: '',
                        pathname: '/**',
                    }
                ] : []
            ) as RemotePattern[])
        ],
    }
  
};

export default nextConfig;
