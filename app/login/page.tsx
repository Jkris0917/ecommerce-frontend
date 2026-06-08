'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { saveTokens } from '@/lib/auth'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [form, setForm] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const data = await api.login(form.username, form.password)
            saveTokens(data.access, data.refresh)
            router.push('/')
        } catch (err) {
            setError('Invalid username or password.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="max-w-md mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8">Login</h1>

            {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="border rounded-lg px-4 py-3 bg-transparent"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="border rounded-lg px-4 py-3 bg-transparent"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <p className="text-center mt-4 text-gray-500">
                Don't have an account?{' '}
                <Link href="/register" className="text-black underline">Register</Link>
            </p>
        </main>
    )
}