import Head from 'next/head';
import Link from 'next/link';
// import { trpc } from '../utils/trpc';

export default function AuditLogPage() {
  // const { data: logs, isLoading } = trpc.audit.getAll.useQuery();
  const logs: any[] = []; // Temporary placeholder
  const isLoading = false;

  if (isLoading) return <div className="min-h-screen p-8">Loading...</div>;

  if (isLoading) return <div className="min-h-screen p-8">Loading...</div>;

  return (
    <>
      <Head>
        <title>Audit Log | docray</title>
      </Head>
      <main className="min-h-screen p-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Audit Log</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Export Log
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs?.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.user?.name || log.user?.email || 'System'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.contract ? (
                      <Link href={`/contracts/${log.contract.id}`} className="text-blue-600 hover:underline">
                        {log.contract.title}
                      </Link>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {log.details ? JSON.stringify(log.details) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {logs?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No audit logs found
            </div>
          )}
        </div>
      </main>
    </>
  );
}
