import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Loader2 } from 'lucide-react';

// Lazy loading das páginas
const Home = React.lazy(() => import('./pages/Home'));
const PessoaDetalhes = React.lazy(() => import('./pages/PessoaDetalhes'));

// Componente de loading
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
      <p className="text-gray-600">Carregando...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pessoa/:id" element={<PessoaDetalhes />} />
            <Route path="/buscar" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
