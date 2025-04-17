import { useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (type) => {
    setError(null);
    if (type === 'LOGIN') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (!error && data?.user) {
        await supabase.from('utilisateurs').insert({ id: data.user.id, email, role: 'admin' });
      } else if (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-xl font-bold">Connexion Admin</h1>
      <input
        className="border px-2 py-1 rounded"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border px-2 py-1 rounded"
        type="password"
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-2">
        <button onClick={() => handleLogin('LOGIN')} className="bg-blue-500 text-white px-4 py-1 rounded">
          Se connecter
        </button>
        <button onClick={() => handleLogin('SIGNUP')} className="bg-gray-500 text-white px-4 py-1 rounded">
          S'inscrire
        </button>
      </div>
    </div>
  );
}
