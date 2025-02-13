import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Order } from "@/types"
import { CheckCircle2, Clock, Package, Truck } from "lucide-react"
import { motion } from "framer-motion"

interface OrderTrackingProps {
  order: Order
}

export default function OrderTracking({ order }: OrderTrackingProps) {
  const steps = [
    { status: "pending", icon: Clock, label: "Order Placed" },
    { status: "processing", icon: Package, label: "Processing" },
    { status: "shipped", icon: Truck, label: "Shipped" },
    { status: "delivered", icon: CheckCircle2, label: "Delivered" },
  ]

  const currentStepIndex = steps.findIndex((step) => step.status === order.status)

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Order Status</CardTitle>
            <CardDescription>
              Order ID: {order.id}
              <br />
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-12">
              <div className="flex justify-between mb-4">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isCompleted = index <= currentStepIndex
                  const isCurrent = index === currentStepIndex

                  return (
                    <motion.div
                      key={step.status}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex flex-col items-center relative z-10"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          isCompleted
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-100"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`mt-2 text-sm font-medium ${
                          isCurrent ? "text-primary" : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
              <div className="absolute top-6 left-0 right-0 h-[2px] bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="h-full bg-primary"
                />
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 py-2 border-b last:border-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className="pt-4 border-t">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-gray-500">
                    <p className="font-medium text-foreground">
                      {order.shippingAddress.fullName}
                    </p>
                    <p>{order.shippingAddress.streetAddress}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                      {order.shippingAddress.postalCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}