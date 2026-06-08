import { Product } from '@/lib/types'
import Link from 'next/link'

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.id}`}>
            <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                {/* Product image or placeholder */}
                <div className="bg-gray-100 h-48 rounded-md mb-3 flex items-center justify-center">
                    {product.image ? (
                        <img src={product.image} alt={product.name} className="h-full object-cover rounded-md" />
                    ) : (
                        <span className="text-gray-400">No image</span>
                    )}
                </div>

                {/* Product info */}
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-500 text-sm mb-2">{product.category.name}</p>
                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-green-600">$ {product.price}</span>
                    <span className="text-sm text-gray-400">
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                </div>
            </div>
        </Link>
    )
}