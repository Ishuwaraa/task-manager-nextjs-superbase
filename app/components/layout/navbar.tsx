import { signout } from "@/utils/actions/auth/actions";
import { createClient } from "@/utils/supabase/server";


export default async function Navbar() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data?.user) return null;

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-semibold">
                        <span className="text-gray-600">Hello,</span>
                        <span className="text-gray-800">{data.user.email}</span>
                    </div>
                    
                    <button 
                        onClick={signout}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}