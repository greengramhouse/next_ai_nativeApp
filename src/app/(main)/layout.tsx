import { Sparkles } from "lucide-react"
import Link from "next/link"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
                <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        <span className="text-lg font-bold">AI Native App</span>
                    </Link>
                    <nav className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Dashboard
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl p-6">{children}</main>
        </div>
    )
}