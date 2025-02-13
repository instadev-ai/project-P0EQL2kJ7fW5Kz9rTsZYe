import { useState } from "react"
import { Cart } from "./components/cart"
import { Checkout } from "./components/checkout"
import { OrderTracking } from "./components/order-tracking"
import { ProductCatalog } from "./components/product-catalog"
import { CartItem, Order, Product, ShippingAddress } from "./types"

// Sample products data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Classic T-Shirt",
    description: "Comfortable cotton t-shirt in various colors",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "clothing",
  },
  {
    id: "2",
    name: "Denim Jeans",
    description: "Classic fit denim jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    category: "clothing",
  },
  {
    id: "3",
    name: "Sneakers",
    description: "Comfortable everyday sneakers",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "shoes",
  },
  {
    id: "4",
    name: "Backpack",
    description: "Durable everyday backpack",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "accessories",
  },
]

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems((prevItems) =>
      quantity === 0
        ? prevItems.filter((item) => item.id !== itemId)
        : prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          )
    )
  }

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const handleCheckout = () => {
    setShowCheckout(true)
  }

  const handlePlaceOrder = (shippingAddress: ShippingAddress) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: cartItems,
      status: "pending",
      total,
      createdAt: new Date().toISOString(),
      shippingAddress,
    }

    setCurrentOrder(newOrder)
    setCartItems([])
    setShowCheckout(false)
  }

  if (currentOrder) {
    return <OrderTracking order={currentOrder} />
  }

  if (showCheckout) {
    return <Checkout items={cartItems} onPlaceOrder={handlePlaceOrder} />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">E-Commerce Store</h1>
          <Cart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        </div>
      </header>
      <main>
        <ProductCatalog products={sampleProducts} onAddToCart={handleAddToCart} />
      </main>
    </div>
  )
}