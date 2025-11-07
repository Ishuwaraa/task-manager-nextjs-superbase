import { login } from '@/utils/actions/auth/actions'
import Link from "next/link";

export default function SignInPage() {
    return (
        <form>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required /><br />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required /><br />
            <button formAction={login}>Log in</button><br />
            <Link className="text-sm underline" href="/signup">
                Dont't have an account? Register Here
            </Link>
        </form>
    )
}