import { signout } from "@/utils/actions/auth/actions";
import { createClient } from "@/utils/supabase/server";


export default async function Navbar() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data?.user) return null;

    return (
        <nav>
            <p>Hello {data.user.email}</p>
            <button onClick={signout}>logout</button>
        </nav>
    )
}