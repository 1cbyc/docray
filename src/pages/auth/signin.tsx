import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function SignIn() {
  const [providers, setProviders] = useState<any>({});
  useEffect(() => {
    getProviders().then(setProviders);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Sign in to docray</h1>
      {Object.values(providers).map((provider: any) => (
        <button
          key={provider.name}
          onClick={() => signIn(provider.id)}
          className="px-4 py-2 bg-blue-600 text-white rounded mb-2"
        >
          Sign in with {provider.name}
        </button>
      ))}
    </div>
  );
}
