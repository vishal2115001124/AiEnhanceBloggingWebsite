import { signOutAction } from "../_lib/action";

export default function SignOutBtn(){
    return (
        <form action={signOutAction}>
            <button className="border-2 border-black py-2 px-1 mx-2 rounded-md soft hover:bg-black hover:text-white">Log Out</button>
        </form>
    )
}