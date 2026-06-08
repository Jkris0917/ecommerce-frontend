'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { getAccessToken } from '@/lib/auth'
import { Order } from '@/lib/types'
import Link from 'next/link'
import { use } from 'react'

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    checking: 'bg-blue-100 text-blue-700',
    delivery: 'bg-purple-100 text-purple-700',
    done: 'bg-green-100 text-green-700',
}

export default function OrderDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const router = useRouter()
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = getAccessToken()
        if (!token) {
            router.push('/login')
            return
        }
        api.getOrder(token, Number(id))
            .then(setOrder)
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <main className="max-w-4xl mx-auto px-4 py-8">Loading...</main>
    if (!order) return <main className="max-w-4xl mx-auto px-4 py-8">Order not found.</main>

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <Link href="/orders" className="text-gray-500 hover:text-black mb-6 inline-block">
                ← Back to Orders
            </Link>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Order #{order.id}</h1>
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status] || 'bg-gray-100'}`}>
                    {order.status}
                </span>
            </div>

            <p className="text-gray-500 mb-8">
                Placed on {new Date(order.created_at).toLocaleDateString()}
            </p>

            {/* Order items */}
            <div className="flex flex-col gap-3 mb-8">
                {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border rounded-lg p-4">
                        <div>
                            <p className="font-semibold">{item.product.name}</p>
                            <p className="text-sm text-gray-500">
                                ${item.price_at_purchase} × {item.quantity}
                            </p>
                        </div>
                        <p className="font-bold">
                            ${(Number(item.price_at_purchase) * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Total */}
            <div className="border-t pt-4 flex justify-between items-center">
                <p className="text-gray-500">Total</p>
                <p className="text-2xl font-bold">${order.total_price}</p>
            </div>
        </main>
    )
}