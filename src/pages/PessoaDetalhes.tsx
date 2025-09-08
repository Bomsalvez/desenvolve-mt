import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pessoasApi } from '../services/api';
import { PessoaDesaparecida, Ocorrencia } from '../types';
import InformacaoForm from '../components/InformacaoForm';
import OcorrenciasAccordion from '../components/OcorrenciasAccordion';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  Eye, 
  Phone, 
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const PessoaDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pessoa, setPessoa] = useState<PessoaDesaparecida | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loadingOcorrencias, setLoadingOcorrencias] = useState(true);

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

  useEffect(() => {
    if (id) {
      fetchPessoa(id);
    }
  }, [id]);

  // Buscar ocorrências quando a pessoa for carregada
  useEffect(() => {
      console.log(pessoa)
    if (pessoa) {
      fetchOcorrencias(pessoa.ultimaOcorrencia.ocoId);
    }
  }, [pessoa]);

  const fetchPessoa = async (pessoaId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await pessoasApi.buscarPorId(pessoaId);
      console.log(data)
      setPessoa(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const fetchOcorrencias = async (ocoId: number) => {
    try {
      setLoadingOcorrencias(true);
      const data = await pessoasApi.buscarOcorrencias(ocoId);
      setOcorrencias(data);
    } catch (err) {
      console.error('Erro ao buscar ocorrências:', err);
      setOcorrencias([]);
    } finally {
      setLoadingOcorrencias(false);
    }
  };

  const handleSubmitInformacao = async (data: any) => {
    try {
      setSubmitting(true);
      await pessoasApi.enviarInformacao(data, pessoa.ultimaOcorrencia.ocoId);
      setShowForm(false);
      // Mostrar mensagem de sucesso
      alert('Informação enviada com sucesso!');
    } catch (err) {
      console.error('Erro ao enviar informação:', err);
      alert('Erro ao enviar informação. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error || !pessoa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Erro ao carregar dados
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  const isLocalizada = !pessoa.vivo || pessoa.ultimaOcorrencia.encontradoVivo;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botão voltar */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        {/* Layout principal com informações flutuantes */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Coluna esquerda - Informações da Pessoa (flutuante) */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              {/* Informações da Pessoa */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações da Pessoa</h2>
                
                {/* Foto */}
                <div className="w-full max-w-xs mx-auto mb-6">
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    {pessoa.urlFoto ? (
                      <img
                        src={pessoa.urlFoto}
                        alt={`Foto de ${pessoa.nome}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-20 h-20 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Informações básicas */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{pessoa.nome}</h1>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        isLocalizada
                          ? 'bg-success-100 text-success-800'
                          : 'bg-warning-100 text-warning-800'
                      }`}
                    >
                      {isLocalizada ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Localizada
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-2" />
                          Desaparecida
                        </>
                      )}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Idade: {pessoa.idade} anos</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Sexo: {pessoa.sexo}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        Desapareceu em: {formatDate(pessoa.ultimaOcorrencia.dtDesaparecimento)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Local: {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seção "Você viu esta pessoa?" - Flutuante embaixo das informações */}
              {!isLocalizada && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Você viu esta pessoa?
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Se você tem informações sobre o paradeiro desta pessoa, 
                      envie-nos os detalhes para que possamos ajudar.
                    </p>
                    <button
                      onClick={() => setShowForm(!showForm)}
                      className="btn-primary w-full"
                    >
                      {showForm ? 'Ver Ocorrências' : 'Enviar Informação'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Coluna direita - Ocorrências ou Formulário ocupando o espaço principal */}
          <div className="flex-1">
            {showForm && !isLocalizada ? (
              /* Formulário de informações - Ocupa o lugar das ocorrências */
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Enviar Informação
                  </h2>
                  <p className="text-gray-600">
                    Preencha os dados abaixo para nos ajudar a localizar esta pessoa.
                  </p>
                </div>
                <InformacaoForm
                  pessoaId={pessoa.id.toString()}
                  onSubmit={handleSubmitInformacao}
                  onCancel={() => setShowForm(false)}
                  isLoading={submitting}
                />
              </div>
            ) : (
              /* Ocorrências - Exibidas normalmente */
              <OcorrenciasAccordion 
                ocorrencias={ocorrencias} 
                ultimaOcorrencia={pessoa.ultimaOcorrencia}
                loading={loadingOcorrencias} 
              />
            )}
          </div>
        </div>

        {/* Informações de contato - No final da página */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">
            Precisa de ajuda?
          </h2>
          <p className="text-blue-800 mb-4">
            Se você tem informações sobre pessoas desaparecidas ou precisa de ajuda, 
            entre em contato com a Polícia Judiciária Civil de Mato Grosso.
          </p>
          <div className="flex items-center space-x-2 text-blue-700">
            <Phone className="w-4 h-4" />
            <span>190 - Polícia Civil</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PessoaDetalhes;
