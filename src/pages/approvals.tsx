import Head from 'next/head';
import Link from 'next/link';
import { trpc } from '../utils/trpc';

export default function ApprovalsPage() {
  const { data: approvals, isLoading } = trpc.approval.getAll.useQuery();
  const updateStatus = trpc.approval.updateStatus.useMutation();

  const handleStatusChange = async (id: string, status: 'APPROVED' | 'REJECTED', comments?: string) => {
    await updateStatus.mutateAsync({ id, status, comments });
    window.location.reload(); // Simple refresh, could use invalidateQueries
  };

  if (isLoading) return <div className="min-h-screen p-8">Loading...</div>;

  return (
    <>
      <Head>
        <title>Approvals | docray</title>
      </Head>
      <main className="min-h-screen p-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Contract Approvals</h1>

        <div className="space-y-4">
          {approvals?.map((approval) => (
            <div key={approval.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    <Link href={`/contracts/${approval.contract.id}`} className="text-blue-600 hover:underline">
                      {approval.contract.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600">Approver: {approval.approver.name || approval.approver.email}</p>
                  <p className="text-sm text-gray-500">
                    Requested on {new Date(approval.contract.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-sm ${
                    approval.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    approval.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {approval.status}
                  </span>
                </div>
              </div>

              {approval.status === 'PENDING' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(approval.id, 'APPROVED')}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(approval.id, 'REJECTED')}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}

              {approval.comments && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm"><strong>Comments:</strong> {approval.comments}</p>
                </div>
              )}
            </div>
          ))}
          {approvals?.length === 0 && (
            <p className="text-gray-500 text-center py-8">No approvals pending</p>
          )}
        </div>
      </main>
    </>
  );
}
