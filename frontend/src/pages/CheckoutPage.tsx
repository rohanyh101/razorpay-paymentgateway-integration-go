import { PaymentForm } from '../components/PaymentForm'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

export function CheckoutPage() {
  return (
    <main className="app-shell">
      <SiteHeader status="secure checkout" />
      <section className="content-grid">
        <div className="intro-column">
          <p className="eyebrow">Razorpay integration / 001</p>
          <h1>Make it<br /><em>meaningful.</em></h1>
          <p className="intro-copy">A small payment, a smooth moment. Choose an amount and experience a secure checkout powered by Razorpay.</p>
          <div className="signal-line"><span /> trusted payment infrastructure <span /></div>
        </div>
        <PaymentForm />
      </section>
      <SiteFooter />
    </main>
  )
}
