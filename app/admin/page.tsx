'use client'

import { useState, useEffect } from 'react'

interface Subscriber {
  email: string
  timestamp: string
  source?: string
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check')
      const data = await response.json()
      
      if (data.authenticated) {
        setAuthenticated(true)
        fetchSubscribers()
      } else {
        setAuthenticated(false)
        setLoading(false)
      }
    } catch (err) {
      setAuthenticated(false)
      setLoading(false)
    } finally {
      setCheckingAuth(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setLoginError(data.error || 'Invalid password')
        return
      }

      setAuthenticated(true)
      setPassword('')
      fetchSubscribers()
    } catch (err) {
      setLoginError('Login failed. Please try again.')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setAuthenticated(false)
      setSubscribers([])
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const fetchSubscribers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/subscribers')
      const data = await response.json()
      
      if (data.success) {
        setSubscribers(data.subscribers)
      } else {
        setError('Failed to load subscribers')
      }
    } catch (err) {
      setError('Failed to load subscribers')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const exportCSV = () => {
    const headers = ['Email', 'Timestamp', 'Source']
    const rows = subscribers.map(s => [
      s.email,
      s.timestamp,
      s.source || 'unknown'
    ])
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Show login form if not authenticated
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-black mb-2">Admin Login</h1>
          <p className="text-sm text-gray-600 mb-6">Enter password to access the admin panel</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                required
                autoFocus
              />
            </div>
            
            {loginError && (
              <p className="text-sm text-red-600">{loginError}</p>
            )}
            
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full px-4 py-3 bg-black text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loginLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-black">Email Subscribers</h1>
              <p className="text-sm text-gray-600 mt-1">
                Total: {subscribers.length} {subscribers.length === 1 ? 'subscriber' : 'subscribers'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchSubscribers}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Refresh
              </button>
              <button
                onClick={exportCSV}
                disabled={subscribers.length === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Export CSV
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading subscribers...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={fetchSubscribers}
                  className="mt-4 px-4 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Try Again
                </button>
              </div>
            ) : subscribers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No subscribers yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date & Time</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm text-gray-900">{subscriber.email}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatDate(subscriber.timestamp)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs">
                            {subscriber.source || 'unknown'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

