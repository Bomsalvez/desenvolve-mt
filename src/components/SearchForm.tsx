import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { SearchParams } from '../types';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  onClear: () => void;
  isLoading?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, onClear, isLoading = false }) => {
  const [formData, setFormData] = useState<SearchParams>({
    nome: '',
    status: '',
    dataInicio: '',
    dataFim: '',
    local: '',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '')
    );
    onSearch(params);
  };

  const handleClear = () => {
    setFormData({
      nome: '',
      status: '',
      dataInicio: '',
      dataFim: '',
      local: '',
    });
    onClear();
  };

  const handleInputChange = (field: keyof SearchParams, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Busca básica */}
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>{isLoading ? 'Buscando...' : 'Buscar'}</span>
          </button>
        </div>

        {/* Filtros avançados */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="input-field"
              >
                <option value="">Todos</option>
                <option value="DESAPARECIDO">Desaparecido</option>
                <option value="LOCALIZADO">Localizado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Início
              </label>
              <input
                type="date"
                value={formData.dataInicio}
                onChange={(e) => handleInputChange('dataInicio', e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Fim
              </label>
              <input
                type="date"
                value={formData.dataFim}
                onChange={(e) => handleInputChange('dataFim', e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Local
              </label>
              <input
                type="text"
                placeholder="Local de desaparecimento"
                value={formData.local}
                onChange={(e) => handleInputChange('local', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center space-x-1"
          >
            <X className="w-4 h-4" />
            <span>Limpar filtros</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
