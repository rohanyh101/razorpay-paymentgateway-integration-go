import type { OrderResponse, RazorpayOptions } from '../types/payment'

export async function createPayment(amount: number): Promise<void> {
  const orderResponse = await fetch('/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency: 'INR' }),
  })
  if (!orderResponse.ok) throw new Error('We could not create your order.')
  const order: OrderResponse = await orderResponse.json()

  const keyResponse = await fetch('/get-key')
  if (!keyResponse.ok) throw new Error('We could not load the payment gateway.')
  const { key } = await keyResponse.json()
  if (!window.Razorpay) throw new Error('Payment checkout is still loading. Try again.')

  const options: RazorpayOptions = {
    key,
    amount: order.amount,
    currency: order.currency,
    name: 'Northstar Studio',
    description: 'A secure demo payment',
    order_id: order.id,
    callback_url: '/payment-callback',
    prefill: { name: 'Demo Customer', email: 'customer@example.com' },
    theme: { color: '#e1ff43' },
  }
  new window.Razorpay(options).open()
}
