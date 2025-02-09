import { upload } from "../_lib/action";

export default function P(){
    return <form action={upload} encType="multipart/form-data">
        <input type="file" name="file" multiple/>
        <button>submit</button>
    </form>
}