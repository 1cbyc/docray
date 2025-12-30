import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>docray Dashboard</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to docray</h1>
        <p className="mb-8">Contract Management & E-Signature Platform</p>
        <nav className="space-x-4">
          <Link href="/contracts">Contracts</Link>
          <Link href="/upload">Upload</Link>
          <Link href="/audit">Audit Log</Link>
        </nav>
      </main>
    </>
  );
}
