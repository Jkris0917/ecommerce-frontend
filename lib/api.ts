const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = {
    // Products
    getProducts: async () => {
        const res = await fetch(`${API_URL}/api/products/`)
        if (!res.ok) throw new Error('Failed to fetch products')
        return res.json()
    },

    getProduct: async (id: number) => {
        const res = await fetch(`${API_URL}/api/products/${id}/`)
        if (!res.ok) throw new Error('Failed to fetch product')
        return res.json()
    },

    register: async (username: string, email: string, password: string) => {
        const res = await fetch(`${API_URL}/api/auth/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        })
        if (!res.ok) throw new Error('Registration failed')
        return res.json()
    },

    login: async (username: string, password: string) => {
        const res = await fetch(`${API_URL}/api/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        if (!res.ok) throw new Error('Login failed')
        return res.json()
    },

    getCart: async (token: string) => {
        const res = await fetch(`${API_URL}/api/cart/`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Failed to fetch cart')
        return res.json()
    },

    addToCart: async (token: string, productId: number) => {
        const res = await fetch(`${API_URL}/api/cart/add/${productId}/`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Failed to add to cart')
        return res.json()
    },

    updateCartItem: async (token: string, itemId: number, quantity: number) => {
        const res = await fetch(`${API_URL}/api/cart/items/${itemId}/`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
        })
        if (!res.ok) throw new Error('Failed to update cart item')
        return res.json()
    },

    removeCartItem: async (token: string, itemId: number) => {
        const res = await fetch(`${API_URL}/api/cart/items/${itemId}/`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Failed to remove cart item')
        return res.json()
    },

    checkout: async (token: string) => {
        const res = await fetch(`${API_URL}/api/orders/checkout/`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Checkout failed')
        return res.json()
    },

    getOrders: async (token: string) => {
        const res = await fetch(`${API_URL}/api/orders/`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Failed to fetch orders')
        return res.json()
    },

    getOrder: async (token: string, id: number) => {
        const res = await fetch(`${API_URL}/api/orders/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Failed to fetch order')
        return res.json()
    },
}