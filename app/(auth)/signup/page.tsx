import { signup } from '@/utils/actions/auth/actions'
import Link from "next/link";

export default function SignUpPage() {
    return (
        <form>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required /><br />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required /><br />
            <button formAction={signup}>Sign up</button><br />
            <Link className="text-sm underline" href="/signin">
                Already have an account? Sign In
            </Link>
        </form>
    )
}