import React from 'react';
import { Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Estatisticas } from '../types';

interface EstatisticasCardProps {
  estatisticas: Estatisticas;
  loading?: boolean;
}

const EstatisticasCard: React.FC<EstatisticasCardProps> = ({ estatisticas, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-primary-500" />
          Estatísticas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2 text-primary-500" />
        Estatísticas
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pessoas Desaparecidas */}
        <div className="bg-gradient-to-r from-warning-50 to-warning-100 rounded-lg p-4 border border-warning-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-warning-800 mb-1">
                Pessoas Desaparecidas
              </p>
              <p className="text-2xl font-bold text-warning-900">
                {estatisticas.quantPessoasDesaparecidas.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="bg-warning-500 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Pessoas Encontradas */}
        <div className="bg-gradient-to-r from-success-50 to-success-100 rounded-lg p-4 border border-success-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-success-800 mb-1">
                Pessoas Encontradas
              </p>
              <p className="text-2xl font-bold text-success-900">
                {estatisticas.quantPessoasEncontradas.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="bg-success-500 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Total de casos:</span>
          <span className="font-semibold">
            {(estatisticas.quantPessoasDesaparecidas + estatisticas.quantPessoasEncontradas).toLocaleString('pt-BR')}
          </span>
        </div>
        {estatisticas.quantPessoasDesaparecidas > 0 && (
          <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
            <span>Taxa de resolução:</span>
            <span className="font-semibold text-success-600">
              {((estatisticas.quantPessoasEncontradas / (estatisticas.quantPessoasDesaparecidas + estatisticas.quantPessoasEncontradas)) * 100).toFixed(1)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstatisticasCard;
