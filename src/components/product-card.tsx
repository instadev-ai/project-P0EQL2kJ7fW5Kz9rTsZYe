import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Product } from "@/types"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
        <CardTitle className="mt-4">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="mt-2 text-lg font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}