import React, { useState, useEffect } from 'react';
import { pessoasApi } from '../services/api';
import { PessoaDesaparecida, PaginationParams, SearchParams, Estatisticas } from '../types';
import PessoaCard from '../components/PessoaCard';
import SearchForm from '../components/SearchForm';
import Pagination from '../components/Pagination';
import EstatisticasCard from '../components/EstatisticasCard';
import ApiTest from '../components/ApiTest';
import { AlertCircle, Loader2 } from 'lucide-react';

const Home: React.FC = () => {
  const [pessoas, setPessoas] = useState<PessoaDesaparecida[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [loadingEstatisticas, setLoadingEstatisticas] = useState(true);

  const pageSize = 10;

  const fetchEstatisticas = async () => {
    try {
      setLoadingEstatisticas(true);
      const stats = await pessoasApi.buscarEstatisticas();
      console.log('Estatísticas da API:', stats);
      setEstatisticas(stats);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setLoadingEstatisticas(false);
    }
  };

  const fetchPessoas = async (page: number = 1, params: SearchParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await pessoasApi.buscar({
        page: page - 1, // API usa base 0
        size: pageSize,
        ...params,
      });

      console.log('Resposta da API:', response);

      // Verificar se a resposta é um array direto ou tem estrutura de paginação
      if (Array.isArray(response)) {
        setPessoas(response);
        setTotalPages(1);
        setTotalElements(response.length);
      } else if (response.content) {
        setPessoas(response.content);
        setTotalPages(response.totalPages || 1);
        setTotalElements(response.totalElements || response.content.length);
      } else {
        // Se não tem estrutura esperada, tratar como array vazio
        setPessoas([]);
        setTotalPages(1);
        setTotalElements(0);
      }
      
      setCurrentPage(page);
    } catch (err) {
      console.error('Erro ao buscar pessoas:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      setPessoas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPessoas(1);
    fetchEstatisticas();
  }, []);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    fetchPessoas(1, params);
  };

  const handleClear = () => {
    setSearchParams({});
    fetchPessoas(1, {});
  };

  const handlePageChange = (page: number) => {
    fetchPessoas(page, searchParams);
  };

  if (loading && pessoas.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header da página */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pessoas Desaparecidas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ajude a encontrar pessoas desaparecidas em Mato Grosso. 
            Consulte os registros e envie informações que possam ajudar.
          </p>
        </div>

        {/* Formulário de busca */}
        <div className="mb-8">
          <SearchForm
            onSearch={handleSearch}
            onClear={handleClear}
            isLoading={loading}
          />
        </div>

        {/* Estatísticas */}
        {estatisticas && (
          <EstatisticasCard 
            estatisticas={estatisticas} 
            loading={loadingEstatisticas} 
          />
        )}

        {/* Lista de pessoas */}
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Erro ao carregar dados
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchPessoas(currentPage, searchParams)}
              className="btn-primary"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            {pessoas.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros de busca ou verifique mais tarde.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {pessoas.map((pessoa) => (
                    <div key={pessoa.id} className="relative">
                      <PessoaCard pessoa={pessoa} />
                    </div>
                  ))}
                </div>

                {/* Paginação */}
                <div className="flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
