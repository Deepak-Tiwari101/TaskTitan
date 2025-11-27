import Link from "next/link";
import Image from "next/image";
import TaskTitanLogo from "@/public/TaskTitanLogo.svg"
import {AnimatedTitle} from "@/components/AnimatedTitle";

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 md:flex ">
                <Image src={TaskTitanLogo} alt="Logo" height={30}/>
                <p className="font-bold md:text-xl hidden md:block">TaskTitan</p>
                {/*<AnimatedTitle />*/}
            </div>
        </Link>
    );
};
