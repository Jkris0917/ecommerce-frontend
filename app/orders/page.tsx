'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { getAccessToken } from '@/lib/auth'
import { Order } from '@/lib/types'
import Link from 'next/link'

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    checking: 'bg-blue-100 text-blue-700',
    delivery: 'bg-purple-100 text-purple-700',
    done: 'bg-green-100 text-green-700',
}

export default function OrdersPage() {
    const router = useRouter()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = getAccessToken()
        if (!token) {
            router.push('/login')
            return
        }
        api.getOrders(token)
            .then(setOrders)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <main className="max-w-4xl mx-auto px-4 py-8">Loading...</main>

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-gray-500 mb-4">No orders yet.</p>
                    <Link href="/" className="bg-black text-white px-6 py-3 rounded-lg">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                        <Link
                            key={order.id}
                            href={`/orders/${order.id}`}
                            className="border rounded-lg p-4 hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">Order #{order.id}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg">${order.total_price}</p>
                                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    )
}