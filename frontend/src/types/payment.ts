export type RazorpayOptions = {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  callback_url: string
  prefill: { name: string; email: string }
  theme: { color: string }
}

export type OrderResponse = {
  id: string
  amount: number
  currency: string
}

export type PaymentReceipt = {
  orderId: string
  paymentId: string
  signature: string
}
