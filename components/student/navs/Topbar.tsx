
import Image from "next/image"
import Link from "next/link"


function Topbar() {
    return (
        <nav className="fixed top-0 z-30 flex w-full items-center justify-between  border-b shadow-lg px-6 py-3">
            <Link href='/' className="flex items-center gap-4">
                <Image
                    src="/logo.svg"
                    alt="logo"
                    width={28}
                    height={28}
                 />
                 <p className="font-semi-bold text-black max-xs:hidden">First name</p>
            </Link>


            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    logout
                </div>
                
            </div>
        </nav>
    )
}


export default Topbar