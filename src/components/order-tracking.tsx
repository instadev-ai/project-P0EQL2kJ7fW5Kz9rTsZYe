import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Order } from "@/types"
import { CheckCircle2, Circle, Clock, Package, Truck } from "lucide-react"

interface OrderTrackingProps {
  order: Order
}

export function OrderTracking({ order }: OrderTrackingProps) {
  const steps = [
    { status: "pending", icon: Clock, label: "Order Placed" },
    { status: "processing", icon: Package, label: "Processing" },
    { status: "shipped", icon: Truck, label: "Shipped" },
    { status: "delivered", icon: CheckCircle2, label: "Delivered" },
  ]

  const currentStepIndex = steps.findIndex((step) => step.status === order.status)

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
        <CardDescription>Order ID: {order.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = index <= currentStepIndex
              const isCurrent = index === currentStepIndex

              return (
                <div
                  key={step.status}
                  className="flex flex-col items-center relative z-10"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`mt-2 text-sm ${
                      isCurrent ? "font-medium" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="absolute top-5 left-0 right-0 h-[2px] bg-gray-100">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{
                width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="font-medium">Order Details</h3>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-medium mb-2">Shipping Address</h3>
          <p className="text-gray-500">
            {order.shippingAddress.fullName}
            <br />
            {order.shippingAddress.streetAddress}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}