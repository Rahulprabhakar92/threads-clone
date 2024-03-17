'use client'
import {sidebarLinks} from "@/constants"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';




function Bottombar(){
    const pathname=usePathname()
    return(
        <section className="fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden">
            <div className="flex  items-center justify-between gap-3 xs:gap-5">
            {sidebarLinks.map((link) => {
                    const isActive=(pathname.includes(link.route) && link.route.length > 1 || link.route === pathname)
                    return(              
                        <div key={link.label}>
                            <Link href={link.route} className={`relative flex flex-col justify-start gap-2 rounded-lg p-4 ${isActive && 'bg-primary-500'}`}>
                                <Image src={link.imgURL} alt={link.label} width={24} height={24} className=" ml-1"/>
                                <p className="text-subtle-medium
                                 text-light-1 mr-2
                                  max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
                            </Link>
                        </div>
                    );
                })}
            </div>
            

        </section>
    )
    }
export default Bottombar;