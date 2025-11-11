import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('Hello World')
  const [apiMessage, setApiMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const fetchHello = async () => {
    if (!BACKEND_URL) {
      setError('Backend URL is not set. Please provide VITE_BACKEND_URL to call the API.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${BACKEND_URL}/api/hello`)
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setApiMessage(data.message || JSON.stringify(data))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // no-op on mount
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{message} 👋</h1>
        <p className="text-gray-600 mb-8">This page is live. Click the button to call the backend API and get its own hello.</p>

        <div className="space-y-4">
          <button
            onClick={fetchHello}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Calling API...' : 'Call Backend /api/hello'}
          </button>

          {apiMessage && (
            <div className="rounded-lg border border-green-200 bg-green-50 text-green-800 p-4">
              Backend says: <span className="font-medium">{apiMessage}</span>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 p-4">
              {error}
            </div>
          )}

          {!BACKEND_URL && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 text-amber-800 p-4 text-sm">
              Tip: Set VITE_BACKEND_URL so the frontend can reach the API. Once set, reload and click the button.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
