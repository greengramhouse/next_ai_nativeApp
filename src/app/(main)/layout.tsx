import Link from "next/link"
import { Sparkles } from "lucide-react"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import UserMenu from "@/app/(main)/_components/header/UserMenu"

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    // ถ้าไม่ได้ Login → Redirect ไปหน้า Login
    if (!session) {
        redirect("/auth/signin")
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Fixed Top Navbar */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left: Logo + Nav */}
                        <div className="flex items-center gap-8">
                            {/* Logo */}
                            <Link href="/dashboard" className="flex items-center gap-2.5 group">
                                <div className="w-9 h-9 bg-linear-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20 group-hover:shadow-purple-600/40 transition">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-lg font-bold text-gray-900 dark:text-gray-100 hidden sm:block">
                                    AI Native<span className="text-purple-600 dark:text-purple-400"> App</span>
                                </span>
                            </Link>

                            {/* Navigation */}
                            <nav className="flex items-center gap-1">
                                <NavLink href="/dashboard" icon="📊">Dashboard</NavLink>
                            </nav>
                        </div>

                        {/* Right: User Menu */}
                        <UserMenu />
                    </div>
                </div>
            </header>

            {/* Main Content (with top padding for fixed header) */}
            <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">{children}</main>
        </div>
    )
}

// Nav Link Component
function NavLink({
    href,
    icon,
    children,
}: {
    href: string
    icon: string
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition"
        >
            <span className="text-base">{icon}</span>
            <span className="hidden sm:inline">{children}</span>
        </Link>
    )
}