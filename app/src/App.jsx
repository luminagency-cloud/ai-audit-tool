import { useState } from 'react'
import AuditForm from './components/AuditForm'
import LoadingState from './components/LoadingState'
import ResultsDashboard from './components/ResultsDashboard'
import Header from './components/Header'
import ErrorState from './components/ErrorState'

const STEPS = {
  FORM: 'form',
  LOADING: 'loading',
  RESULTS: 'results',
  ERROR: 'error',
}

export default function App() {
  const [step, setStep] = useState(STEPS.FORM)
  const [auditData, setAuditData] = useState(null)
  const [formInput, setFormInput] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = (data) => {
    setFormInput(data)
    setStep(STEPS.LOADING)
    setError(null)
    runAudit(data)
  }

  const runAudit = async (data) => {
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.message || `Server error: ${res.status}`)
      }
      const result = await res.json()
      setAuditData(result)
      setStep(STEPS.RESULTS)
    } catch (err) {
      console.error('[AUDIT ERROR]', err)
      setError(err.message || 'Something went wrong. Please try again.')
      setStep(STEPS.ERROR)
    }
  }

  const handleReset = () => {
    setStep(STEPS.FORM)
    setAuditData(null)
    setFormInput(null)
    setError(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onReset={handleReset} showReset={step !== STEPS.FORM} />

      <main className="flex-1">
        {step === STEPS.FORM && <AuditForm onSubmit={handleSubmit} />}
        {step === STEPS.LOADING && <LoadingState businessName={formInput?.businessName} />}
        {step === STEPS.RESULTS && (
          <ResultsDashboard data={auditData} input={formInput} onNewAudit={handleReset} />
        )}
        {step === STEPS.ERROR && (
          <ErrorState message={error} onRetry={() => formInput && handleSubmit(formInput)} onNew={handleReset} />
        )}
      </main>

      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <p>Free while in beta · Paid plans coming soon</p>
      </footer>
    </div>
  )
}
