/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true,
        serverComponentsExternalPackages:["mongoose"],
    },
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'img.clerk.com'
            }
        ]
    }
};

export default nextConfig;
