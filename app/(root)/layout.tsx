import Navbar from "../components/layout/navbar";

export default async function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar/>
            {children}
        </>
    );
}