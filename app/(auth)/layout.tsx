import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import '../globals.css'

export const metadata={
    title:"Threads",
    description:"Threads clone"
}

const inter=Inter({subsets:['latin']})

export default function RootLayout({
    children
}:
{
    children:React.ReactNode
})
{
    return(
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1` }>
                    <div className="flex flex-col w-full items-center min-h-screen justify-center">
                    {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}