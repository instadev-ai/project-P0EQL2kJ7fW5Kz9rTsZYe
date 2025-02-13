import { Product } from "@/types"
import { ProductCard } from "./product-card"
import { useState } from "react"
import { Button } from "./ui/button"

interface ProductCatalogProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function ProductCatalog({ products, onAddToCart }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  )

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products

  return (
    <div>
      <div className="flex justify-center mb-8 space-x-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="transition-all duration-300"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize transition-all duration-300"
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="transform hover:-translate-y-1 transition-transform duration-300"
          >
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </div>
  )
}