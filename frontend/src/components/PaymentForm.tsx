import { useState } from 'react'
import type { FormEvent } from 'react'
import { createPayment } from '../services/payment'

export function PaymentForm() {
  const [amount, setAmount] = useState('499')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const formattedAmount = Number(amount || 0).toLocaleString('en-IN')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const numericAmount = Number(amount)
    if (!Number.isInteger(numericAmount) || numericAmount < 1) {
      setError('Enter an amount of at least ₹1 to continue.')
      return
    }

    setError('')
    setIsLoading(true)
    try {
      await createPayment(numericAmount)
    } catch (paymentError) {
      setError(paymentError instanceof Error ? paymentError.message : 'Something went wrong. Please retry.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="payment-card">
      <div className="card-topline"><span>PAYMENT AMOUNT</span><span className="card-index">01 / 01</span></div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">How much would you like to pay?</label>
        <div className="amount-input-wrap"><span className="currency-symbol">₹</span><input id="amount" name="amount" type="number" min="1" step="1" inputMode="numeric" value={amount} onChange={(event) => setAmount(event.target.value)} aria-describedby={error ? 'payment-error' : 'amount-preview'} autoFocus /><span className="currency-code">INR</span></div>
        <div className="presets" aria-label="Suggested amounts">{[199, 499, 999].map((preset) => <button key={preset} type="button" className={amount === String(preset) ? 'preset active' : 'preset'} onClick={() => setAmount(String(preset))}>₹{preset}</button>)}</div>
        {error && <p id="payment-error" className="error-message" role="alert">{error}</p>}
        <div className="summary-row" id="amount-preview"><span>Amount due</span><strong>₹{formattedAmount || '0'}</strong></div>
        <button className="pay-button" type="submit" disabled={isLoading}><span>{isLoading ? 'Preparing checkout...' : 'Continue to payment'}</span>{!isLoading && <span className="arrow">↗</span>}</button>
      </form>
      <div className="card-footer"><span className="lock-icon">▣</span><span>Your payment details are handled securely by Razorpay.</span></div>
    </div>
  )
}
