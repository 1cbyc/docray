import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ContractDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>Contract Details | docray</title>
      </Head>
      <main className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">Contract Details</h1>
        <p>Contract ID: {id}</p>
        {/* TODO: Show contract details, actions, signatures, approvals */}
      </main>
    </>
  );
}
