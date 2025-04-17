import { useState } from 'react';
import Clients from './modules/Clients.jsx';
import Produits from './modules/Produits.jsx';
import Devis from './modules/Devis.jsx';

export default function Dashboard() {
  const [onglet, setOnglet] = useState('clients');

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Panneau d'administration</h2>
      <div className="flex gap-4 mb-4">
        <button onClick={() => setOnglet('clients')} className="bg-blue-500 text-white px-4 py-1 rounded">Clients</button>
        <button onClick={() => setOnglet('produits')} className="bg-blue-500 text-white px-4 py-1 rounded">Produits</button>
        <button onClick={() => setOnglet('devis')} className="bg-blue-500 text-white px-4 py-1 rounded">Devis</button>
      </div>
      {onglet === 'clients' && <Clients />}
      {onglet === 'produits' && <Produits />}
      {onglet === 'devis' && <Devis />}
    </div>
  );
}
