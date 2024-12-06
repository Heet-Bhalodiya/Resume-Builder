'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Resume {
  _id: string
  title: string
  createdAt: string
  updatedAt: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchResumes()
    }
  }, [status, router])

  const fetchResumes = async () => {
    try {
      const res = await fetch('/api/resumes')
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch resumes')
      }

      setResumes(data)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return

    try {
      const res = await fetch(\`/api/resumes/\${id}\`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete resume')
      }

      setResumes(resumes.filter((resume) => resume._id !== id))
    } catch (error: any) {
      setError(error.message)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
          <Link
            href="/builder"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all"
          >
            Create New Resume
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-md mb-6">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {resumes.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No resumes yet. Create your first resume to get started!
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {resumes.map((resume) => (
                <li key={resume._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {resume.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Last updated:{' '}
                        {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        href={\`/builder/\${resume._id}\`}
                        className="text-primary hover:text-opacity-90"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(resume._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
