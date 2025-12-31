import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>docray - Contract Management Platform</title>
      </Head>
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to docray</h1>
          <p className="text-lg text-gray-600 mb-8">
            A comprehensive contract management and e-signature platform for legal, finance, and business teams.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/contracts" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Contracts</h2>
              <p className="text-gray-600">Manage and view all contracts</p>
            </Link>

            <Link href="/upload" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload</h2>
              <p className="text-gray-600">Upload new contract documents</p>
            </Link>

            <Link href="/approvals" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Approvals</h2>
              <p className="text-gray-600">Review and approve contracts</p>
            </Link>

            <Link href="/audit" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Audit</h2>
              <p className="text-gray-600">View audit logs and history</p>
            </Link>

            <Link href="/auth/signin" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign In</h2>
              <p className="text-gray-600">Access your account</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}