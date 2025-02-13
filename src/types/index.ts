export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  total: number
  createdAt: string
  shippingAddress: ShippingAddress
}

export interface ShippingAddress {
  fullName: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  country: string
}