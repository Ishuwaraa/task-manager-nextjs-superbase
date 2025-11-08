import { Suspense } from 'react';
import SignInForm from './signin-form';

export default function SignInPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div>Loading...</div>
            </div>
        }>
            <SignInForm />
        </Suspense>
    );
}