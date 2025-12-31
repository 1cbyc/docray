import Head from 'next/head';
import Link from 'next/link';
import { trpc } from '../../utils/trpc';

export default function ContractsPage() {
  const { data: contracts, isLoading } = trpc.contract.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Contracts | docray</title>
      </Head>
      <main className="min-h-screen p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Contracts</h1>
          <Link href="/upload" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Upload New Contract
          </Link>
        </div>

        <div className="grid gap-4">
          {contracts?.map((contract) => (
            <div key={contract.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    <Link href={`/contracts/${contract.id}`} className="text-blue-600 hover:underline">
                      {contract.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-2">Status: {contract.status}</p>
                  <p className="text-sm text-gray-500">
                    Created by {contract.createdBy.name || contract.createdBy.email} on {new Date(contract.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Parties: {contract.parties.map(p => p.name).join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-sm ${
                    contract.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                    contract.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                    contract.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {contract.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {contracts?.length === 0 && (
            <p className="text-gray-500 text-center py-8">No contracts found. <Link href="/upload" className="text-blue-600">Upload your first contract</Link></p>
          )}
        </div>
      </main>
    </>
  );
}
