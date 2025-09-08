import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, User, Clock } from 'lucide-react';
import { PessoaDesaparecida } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PessoaCardProps {
  pessoa: PessoaDesaparecida;
}

const PessoaCard: React.FC<PessoaCardProps> = ({ pessoa }) => {
  const isLocalizada = !pessoa.vivo || pessoa.ultimaOcorrencia.encontradoVivo;

  // Função para formatar data com validação
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    } catch (error) {
      return 'Data inválida';
    }
  };

  return (
    <Link to={`/pessoa/${pessoa.id}`} className="block">
      <div className="card hover:shadow-lg transition-shadow duration-200 relative">
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-large ${
              isLocalizada
                ? 'bg-success-100 text-success-800'
                : 'bg-warning-100 text-warning-800'
            }`}
          >
            {isLocalizada ? 'Localizada' : 'Desaparecida'}
          </span>
        </div>

        {/* Foto */}
        <div className="aspect-square bg-gray-200 overflow-hidden">
          {pessoa.urlFoto ? (
            <img
              src={pessoa.urlFoto}
              alt={`Foto de ${pessoa.nome}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {pessoa.nome}
          </h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span>
                {pessoa.idade} anos - {pessoa.sexo}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="truncate">{pessoa.ultimaOcorrencia.localDesaparecimentoConcat}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>
                Desapareceu em {formatDate(pessoa.ultimaOcorrencia.dtDesaparecimento)}
              </span>
            </div>
          </div>

          {/* Informações adicionais */}
          {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                <strong>Vestimentas:</strong> {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PessoaCard;
