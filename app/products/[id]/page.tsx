'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { getAccessToken } from '@/lib/auth'
import { Product } from '@/lib/types'
import Link from 'next/link'
import { use } from 'react'

export default function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [adding, setAdding] = useState(false)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        api.getProduct(Number(id)).then(setProduct)
    }, [id])

    const handleAddToCart = async () => {
        const token = getAccessToken()
        if (!token) {
            router.push('/login')
            return
        }
        setAdding(true)
        try {
            await api.addToCart(token, Number(id))
            setAdded(true)
            setTimeout(() => setAdded(false), 2000)
        } catch {
            alert('Failed to add to cart')
        } finally {
            setAdding(false)
        }
    }

    if (!product) return <main className="max-w-4xl mx-auto px-4 py-8">Loading...</main>

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <Link href="/" className="text-gray-500 hover:text-black mb-6 inline-block">
                ← Back to Products
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                    {product.image ? (
                        <img src={product.image} alt={product.name} className="h-full object-cover rounded-lg" />
                    ) : (
                        <span className="text-gray-400 text-lg">No image</span>
                    )}
                </div>

                <div>
                    <p className="text-sm text-gray-500 mb-1">{product.category.name}</p>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-2xl font-bold text-green-600 mb-4">${product.price}</p>
                    <p className="text-gray-600 mb-6">{product.description || 'No description available.'}</p>

                    <p className="text-sm mb-6">
                        {product.stock > 0 ? (
                            <span className="text-green-600">✓ {product.stock} in stock</span>
                        ) : (
                            <span className="text-red-500">✗ Out of stock</span>
                        )}
                    </p>

                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0 || adding}
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {added ? '✓ Added to Cart!' : adding ? 'Adding...' : product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>

                    {added && (
                        <Link href="/cart" className="block text-center mt-3 text-gray-600 underline">
                            View Cart →
                        </Link>
                    )}
                </div>
            </div>
        </main>
    )
}