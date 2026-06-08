import { api } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/lib/types'

export default async function HomePage() {
  const products: Product[] = await api.getProducts()

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}