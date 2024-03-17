import Link from "next/link";
import Image from "next/image";
import {dark} from "@clerk/themes"
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";

function Topbar(){
    return(
<nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-dark-2 px-6 py-3">
        <Link href='/' className="flex
        items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo"
        width={28} height={28}/>
        <p className="text-heading3-bold 
        text-light-1 max-xs:hidden">Threads</p>
        </Link>

        <div className="flex justify-center">
            <div className="block md:hidden py-3">
            <SignedIn>
                <SignOutButton>
                    <Image 
                    src="/assets/logout.svg"
                    alt="logout"
                    width={25}
                    height={25}/>
                </SignOutButton>
            </SignedIn>
            </div>
            <OrganizationSwitcher
            appearance={{
                baseTheme:dark,
                elements:{
                    organizationSwitcherTrigger:
                    "py-2 px-4"
                }
            }}
            />
        </div>

        

       </nav>
    )
    }
export default Topbar;