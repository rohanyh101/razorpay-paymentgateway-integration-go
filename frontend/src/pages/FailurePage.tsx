import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

export function FailurePage() {
  return (
    <main className="app-shell receipt-shell">
      <SiteHeader status="payment not completed" />
      <section className="receipt-layout">
        <div className="receipt-intro"><span className="failure-symbol">!</span><p className="eyebrow">Transaction incomplete / 001</p><h1>Let’s<br /><em>retry.</em></h1><p className="intro-copy">The payment could not be verified. No worries, you can return to checkout and try again.</p></div>
        <div className="receipt-card"><div className="card-topline"><span>PAYMENT STATUS</span><span className="card-index">RETRY</span></div><div className="receipt-status"><span className="failure-check">!</span><div><strong>Payment not completed</strong><span>No payment was confirmed</span></div></div><a className="pay-button receipt-button" href="/"><span>Return to checkout</span><span className="arrow">↗</span></a><div className="card-footer"><span className="lock-icon">▣</span><span>Your payment details remain secure.</span></div></div>
      </section>
      <SiteFooter />
    </main>
  )
}
