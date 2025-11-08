"use client";

import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div>
            <div>
                <h2>Oops! Something went wrong.</h2>
                <p>Error: {error.message}</p>
                <p>Digest: {error.digest}</p>
            </div>
            <div>
                <button onClick={() => reset()}>Try again</button><br />
                <Link href="/">Back to homepage</Link>
            </div>
        </div>
    );
}