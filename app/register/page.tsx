'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { saveTokens } from '@/lib/auth'
import Link from 'next/link'

export default function RegisterPage() {
    const router = useRouter()
    const [form, setForm] = useState({ username: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const data = await api.register(form.username, form.email, form.password)
            saveTokens(data.access, data.refresh)
            router.push('/')
        } catch (err) {
            setError('Registration failed. Username may already exist.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="max-w-md mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8">Register</h1>

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
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <p className="text-center mt-4 text-gray-500">
                Already have an account?{' '}
                <Link href="/login" className="text-black underline">Login</Link>
            </p>
        </main>
    )
}