import Image from "next/image";
import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";

import { Button } from "./ui/button";


const HomeNavbar = () => {
    const { userId } = auth();

    return (
        <nav className="mt-4 md:mt-6 mx-auto max-w-screen-xl">
            <div className="px-4 flex flex-row justify-between items-center">
                <div className="flex justify-center">
                    <Image
                        src='/logo.svg'
                        alt="logo"
                        height={180}
                        width={180}
                    />
                </div>
                {!userId ? (
                    <div className="flex gap-2">
                        <Link href='/sign-in'>
                            <Button
                                variant='link'
                                className="rounded-full px-6 text-base hover:opacity-75"
                            >
                                Log in
                            </Button>
                        </Link>
                        <Link href='/sign-up'>
                            <Button
                                variant='outline'
                                className="rounded-full px-6 text-base"
                            >
                                Register
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="border-4 rounded-full">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                )}
            </div>
        </nav>
    )
}

export default HomeNavbar