'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { getAccessToken } from '@/lib/auth'
import { Cart, CartItem } from '@/lib/types'
import Link from 'next/link'

export default function CartPage() {
    const router = useRouter()
    const [cart, setCart] = useState<Cart | null>(null)
    const [loading, setLoading] = useState(true)
    const [checkingOut, setCheckingOut] = useState(false)

    useEffect(() => {
        const token = getAccessToken()
        if (!token) {
            router.push('/login')
            return
        }
        fetchCart(token)
    }, [])

    const fetchCart = async (token: string) => {
        try {
            const data = await api.getCart(token)
            setCart(data)
        } catch {
            console.error('Failed to fetch cart')
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = async (itemId: number) => {
        const token = getAccessToken()
        if (!token) return
        await api.removeCartItem(token, itemId)
        fetchCart(token)
    }

    const handleQuantity = async (itemId: number, quantity: number) => {
        const token = getAccessToken()
        if (!token) return
        if (quantity < 1) return
        await api.updateCartItem(token, itemId, quantity)
        fetchCart(token)
    }

    const handleCheckout = async () => {
        const token = getAccessToken()
        if (!token) return
        setCheckingOut(true)
        try {
            await api.checkout(token)
            router.push('/orders')
        } catch {
            alert('Checkout failed. Please try again.')
        } finally {
            setCheckingOut(false)
        }
    }

    const total = cart?.items.reduce(
        (sum, item) => sum + Number(item.product.price) * item.quantity, 0
    ) ?? 0

    if (loading) return <main className="max-w-4xl mx-auto px-4 py-8">Loading...</main>

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

            {!cart || cart.items.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-gray-500 mb-4">Your cart is empty.</p>
                    <Link href="/" className="bg-black text-white px-6 py-3 rounded-lg">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <>
                    {/* Cart items */}
                    <div className="flex flex-col gap-4 mb-8">
                        {cart.items.map((item: CartItem) => (
                            <div key={item.id} className="flex items-center gap-4 border rounded-lg p-4">
                                {/* Product info */}
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.product.name}</h3>
                                    <p className="text-green-600">${item.product.price}</p>
                                </div>

                                {/* Quantity controls */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Item total */}
                                <p className="w-24 text-right font-semibold">
                                    ${(Number(item.product.price) * item.quantity).toFixed(2)}
                                </p>

                                {/* Remove button */}
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="text-red-500 hover:text-red-700 ml-2"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Total + Checkout */}
                    <div className="border-t pt-6 flex justify-between items-center">
                        <div>
                            <p className="text-gray-500">Total</p>
                            <p className="text-2xl font-bold">${total.toFixed(2)}</p>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={checkingOut}
                            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                        >
                            {checkingOut ? 'Processing...' : 'Checkout'}
                        </button>
                    </div>
                </>
            )}
        </main>
    )
}