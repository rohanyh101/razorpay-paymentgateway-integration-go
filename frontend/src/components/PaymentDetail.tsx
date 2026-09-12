import { useState } from 'react'

type PaymentDetailProps = {
  label: string
  value: string
}

export function PaymentDetail({ label, value }: PaymentDetailProps) {
  const [copied, setCopied] = useState(false)

  async function copyValue() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="payment-detail">
      <div className="payment-detail-heading"><dt>{label}</dt><button type="button" onClick={copyValue}>{copied ? 'Copied' : 'Copy'}</button></div>
      <dd>{value}</dd>
    </div>
  )
}
