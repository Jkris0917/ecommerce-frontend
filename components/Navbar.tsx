'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isLoggedIn, removeTokens } from '@/lib/auth'

export default function Navbar() {
    const router = useRouter()
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        setLoggedIn(isLoggedIn())
    }, [])

    const handleLogout = () => {
        removeTokens()
        setLoggedIn(false)
        router.push('/')
    }

    return (
        <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
                🛒 E-Shop
            </Link>
            <div className="flex gap-4 items-center">
                {loggedIn ? (
                    <>
                        <Link href="/cart" className="text-gray-600 hover:text-black">Cart</Link>
                        <Link href="/orders" className="text-gray-600 hover:text-black">Orders</Link>
                        <button
                            onClick={handleLogout}
                            className="text-gray-600 hover:text-black"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-gray-600 hover:text-black">Login</Link>
                        <Link href="/register" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}