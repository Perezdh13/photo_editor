import Link from "next/link";

export default function Home(){
    return(
        <Link href={"/editor"}>
        <button > Editor </button>
        </Link>
    )
}