import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient.js';
import Auth from './components/Auth.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.error('Erreur session:', error);
      setSession(session);
      if (session) fetchUserRole(session.user.id);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchUserRole(session.user.id);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const fetchUserRole = async (userId) => {
    const { data, error } = await supabase
      .from('utilisateurs')
      .select('role')
      .eq('id', userId)
      .single();
    if (data) setUserRole(data.role);
    if (error) console.error('Erreur récupération rôle:', error);
  };

  if (!session) return <Auth />;
  if (userRole !== 'admin') return <div className="p-4 text-red-500">Accès réservé aux administrateurs</div>;

  return <Dashboard />;
}

export default App;
