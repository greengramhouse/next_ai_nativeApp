"use client"

import { useEffect, useState } from "react"
import { MailCheck, Loader2, AlertCircle, Sparkles } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        // อ่านพารามิเตอร์จาก URL
        const params = new URLSearchParams(window.location.search)
        const error = params.get("error")
        const token = params.get("token") // Better Auth บางเวอร์ชันอาจจะยังทิ้ง token ไว้

        // 1. ถ้ามี error แปะมากับ URL แปลว่าระบบหลังบ้านยืนยันไม่สำเร็จ
        if (error) {
            setStatus("error")
            setErrorMessage(error === "invalid_token" ? "Token ไม่ถูกต้องหรือหมดอายุ" : "เกิดข้อผิดพลาดในการยืนยันอีเมล")
            return
        }

        // 2. ถ้ามาถึงหน้านี้ได้โดยไม่มี Error (เพราะโดน Redirect มาจาก API) แปลว่าสำเร็จแล้ว!
        // หน่วงเวลาโหลดนิดนึงให้ดูเนียนตา (ไม่จำเป็นต้องยิง API ฝั่ง Client ซ้ำแล้ว)
        const timer = setTimeout(() => {
            setStatus("success")
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <span className="text-xl font-bold">AI Native App</span>
            </div>

            {/* สถานะ Loading */}
            {status === "loading" && (
                <div className="flex flex-col items-center space-y-4 text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
                    <h1 className="text-2xl font-semibold tracking-tight">กำลังตรวจสอบการยืนยันอีเมล...</h1>
                </div>
            )}

            {/* สถานะ Success */}
            {status === "success" && (
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                        <MailCheck className="h-8 w-8 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">ยืนยันอีเมลสำเร็จ!</h1>
                    <p className="text-sm text-muted-foreground">อีเมลของคุณได้รับการยืนยันเรียบร้อยแล้ว</p>
                    <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition">
                        ไปหน้า Dashboard
                    </Link>
                </div>
            )}

            {/* สถานะ Error */}
            {status === "error" && (
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                        <AlertCircle className="h-8 w-8 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">ยืนยันอีเมลไม่สำเร็จ</h1>
                    <p className="text-sm text-muted-foreground">{errorMessage}</p>
                    <Link href="/profile" className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition">
                        กลับไปหน้าโปรไฟล์
                    </Link>
                </div>
            )}
        </div>
    )
}