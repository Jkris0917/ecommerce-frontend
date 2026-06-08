export interface Category {
    id: number
    name: string
    description: string
}

export interface Product {
    id: number
    name: string
    description: string
    price: string
    stock: number
    category: Category
    image: string | null
    created_at: string
}

export interface CartItem {
    id: number
    product: Product
    quantity: number
}

export interface Cart {
    id: number
    user: number
    items: CartItem[]
}

export interface OrderItem {
    id: number
    product: Product
    quantity: number
    price_at_purchase: string
}

export interface Order {
    id: number
    status: string
    total_price: string
    created_at: string
    items: OrderItem[]
}