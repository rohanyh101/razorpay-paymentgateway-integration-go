import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { PaymentDetail } from '../components/PaymentDetail'
import type { PaymentReceipt } from '../types/payment'

function readReceipt(): PaymentReceipt {
  const params = new URLSearchParams(window.location.search)
  return { orderId: params.get('orderId') || 'Not available', paymentId: params.get('paymentId') || 'Not available', signature: params.get('signature') || 'Not available' }
}

export function SuccessPage() {
  const { orderId, paymentId, signature } = readReceipt()
  return (
    <main className="app-shell receipt-shell">
      <SiteHeader status="payment verified" />
      <section className="receipt-layout">
        <div className="receipt-intro"><span className="success-symbol">✓</span><p className="eyebrow">Transaction complete / 001</p><h1>Payment<br /><em>received.</em></h1><p className="intro-copy">Thank you. Your payment has been verified successfully and your receipt details are below.</p></div>
        <div className="receipt-card">
          <div className="card-topline"><span>PAYMENT RECEIPT</span><span className="card-index">VERIFIED</span></div>
          <div className="receipt-status"><span className="status-check">✓</span><div><strong>Payment successful</strong><span>Razorpay secured this transaction</span></div></div>
          <div className="receipt-details" aria-label="Payment identifiers"><PaymentDetail label="Order ID" value={orderId} /><PaymentDetail label="Payment ID" value={paymentId} /><PaymentDetail label="Signature" value={signature} /></div>
          <a className="pay-button receipt-button" href="/"><span>Make another payment</span><span className="arrow">↗</span></a>
          <div className="card-footer"><span className="lock-icon">▣</span><span>Keep this confirmation for your records.</span></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
