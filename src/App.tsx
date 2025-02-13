import { useState } from "react"
import { Cart } from "./components/cart"
import { Checkout } from "./components/checkout"
import { OrderTracking } from "./components/order-tracking"
import { ProductCatalog } from "./components/product-catalog"
import { CartItem, Order, Product, ShippingAddress } from "./types"
import { ShoppingBag } from "lucide-react"

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    description: "Luxuriously soft cotton blend with a modern fit",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "clothing",
  },
  {
    id: "2",
    name: "Slim-Fit Denim Jeans",
    description: "Classic indigo wash with stretch comfort",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    category: "clothing",
  },
  {
    id: "3",
    name: "Urban Sport Sneakers",
    description: "Lightweight cushioning for all-day comfort",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "shoes",
  },
  {
    id: "4",
    name: "Canvas Backpack",
    description: "Water-resistant with leather trim details",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "accessories",
  },
  {
    id: "5",
    name: "Wireless Headphones",
    description: "Premium sound with active noise cancellation",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "electronics",
  },
  {
    id: "6",
    name: "Smart Watch",
    description: "Track fitness and stay connected in style",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    category: "electronics",
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
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
                Elegant Store
              </h1>
            </div>
          </div>
        </header>
        <OrderTracking order={currentOrder} />
      </div>
    )
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
                Elegant Store
              </h1>
            </div>
          </div>
        </header>
        <Checkout items={cartItems} onPlaceOrder={handlePlaceOrder} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
              Elegant Store
            </h1>
          </div>
          <Cart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        </div>
      </header>
      <main className="py-8 px-4">
        <div className="container mx-auto">
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collection of premium products,
              designed to elevate your lifestyle with quality and style.
            </p>
          </section>
          <ProductCatalog products={sampleProducts} onAddToCart={handleAddToCart} />
        </div>
      </main>
      <footer className="bg-white border-t mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">About Us</h3>
              <p className="text-gray-600">
                We bring you the finest selection of products, carefully chosen for
                quality and style.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Shipping Information</li>
                <li>Returns & Exchanges</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Facebook</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2024 Elegant Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}