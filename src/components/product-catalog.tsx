import { Product } from "@/types"
import { ProductCard } from "./product-card"

interface ProductCatalogProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function ProductCatalog({ products, onAddToCart }: ProductCatalogProps) {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  )
}