import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { trpc } from '../../utils/trpc';

export default function ContractDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: contract, isLoading } = trpc.contract.getById.useQuery(id as string, {
    enabled: !!id,
  });

  if (isLoading) return <div className="min-h-screen p-8">Loading...</div>;
  if (!contract) return <div className="min-h-screen p-8">Contract not found</div>;

  return (
    <>
      <Head>
        <title>{contract.title} | docray</title>
      </Head>
      <main className="min-h-screen p-8">
        <div className="mb-8">
          <Link href="/contracts" className="text-blue-600 hover:underline">← Back to Contracts</Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{contract.title}</h1>
              <p className="text-gray-600">Status: <span className={`px-2 py-1 rounded text-sm ${
                contract.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                contract.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                contract.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>{contract.status}</span></p>
              <p className="text-sm text-gray-500 mt-2">
                Created by {contract.createdBy.name || contract.createdBy.email} on {new Date(contract.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Download PDF
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Extract Terms
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Parties</h2>
              <div className="space-y-2">
                {contract.parties.map((party) => (
                  <div key={party.id} className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>{party.name}</span>
                    <span className="text-gray-600">{party.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Signatures</h2>
              <div className="space-y-2">
                {contract.signatures.map((signature) => (
                  <div key={signature.id} className="p-2 bg-gray-50 rounded">
                    <p>{signature.signer.name || signature.signer.email}</p>
                    <p className="text-sm text-gray-600">
                      {signature.signedAt ? `Signed on ${new Date(signature.signedAt).toLocaleDateString()}` : 'Not signed'}
                    </p>
                  </div>
                ))}
                {contract.signatures.length === 0 && <p className="text-gray-500">No signatures yet</p>}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Approvals</h2>
            <div className="space-y-2">
              {contract.approvals.map((approval) => (
                <div key={approval.id} className="p-3 bg-gray-50 rounded">
                  <div className="flex justify-between items-center">
                    <span>{approval.approver.name || approval.approver.email}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      approval.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      approval.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {approval.status}
                    </span>
                  </div>
                  {approval.comments && <p className="text-sm text-gray-600 mt-1">{approval.comments}</p>}
                  {approval.decidedAt && <p className="text-xs text-gray-500">Decided on {new Date(approval.decidedAt).toLocaleDateString()}</p>}
                </div>
              ))}
              {contract.approvals.length === 0 && <p className="text-gray-500">No approvals yet</p>}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
