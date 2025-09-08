import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Calendar, FileText, Paperclip } from 'lucide-react';
import { Ocorrencia, UltimaOcorrencia } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface OcorrenciasAccordionProps {
  ocorrencias: Ocorrencia[];
  ultimaOcorrencia?: UltimaOcorrencia;
  loading?: boolean;
}

const OcorrenciasAccordion: React.FC<OcorrenciasAccordionProps> = ({ ocorrencias, ultimaOcorrencia, loading = false }) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      return format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR });
    } catch (error) {
      return 'Data inválida';
    }
  };

  // Verificar se uma ocorrência é a última ocorrência baseada na data
  const isUltimaOcorrencia = (ocorrencia: Ocorrencia) => {
    if (!ultimaOcorrencia) return false;
    
    // Comparar a data da ocorrência com a data de desaparecimento da última ocorrência
    const dataOcorrencia = new Date(ocorrencia.data);
    const dataUltimaOcorrencia = new Date(ultimaOcorrencia.dtDesaparecimento);
    
    // Verificar se as datas são iguais (mesmo dia)
    return dataOcorrencia.toDateString() === dataUltimaOcorrencia.toDateString();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ocorrências</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!ocorrencias || ocorrencias.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ocorrências</h2>
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma ocorrência encontrada</p>
        </div>
      </div>
    );
  }

  // Ordenar ocorrências por data (mais recente primeiro)
  const ocorrenciasOrdenadas = [...ocorrencias].sort((a, b) => {
    const dateA = new Date(a.data);
    const dateB = new Date(b.data);
    return dateB.getTime() - dateA.getTime(); // Ordem decrescente (mais recente primeiro)
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Ocorrências</h2>
      
      <div className="space-y-2">
        {ocorrenciasOrdenadas.map((ocorrencia, index) => {
          const isExpanded = expandedItems.has(ocorrencia.id);
          const isUltima = isUltimaOcorrencia(ocorrencia);
          
          return (
            <div key={ocorrencia.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleExpanded(ocorrencia.id)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {formatDate(ocorrencia.data)}
                        </span>
                        {isUltima && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            Última Ocorrência
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 truncate">
                        {ocorrencia.informacao || 'Sem informações adicionais'}
                      </p>
                      
                      {ocorrencia.anexos && ocorrencia.anexos.length > 0 && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Paperclip className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {ocorrencia.anexos.length} anexo(s)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="pt-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Informações</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {ocorrencia.informacao || 'Nenhuma informação adicional disponível.'}
                        </p>
                      </div>
                      
                      {ocorrencia.anexos && ocorrencia.anexos.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Anexos</h4>
                          <div className="space-y-2">
                            {ocorrencia.anexos.map((anexo, anexoIndex) => (
                              <div key={anexoIndex} className="flex items-center space-x-2">
                                <Paperclip className="w-4 h-4 text-gray-400" />
                                <a
                                  href={anexo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary-600 hover:text-primary-800 underline"
                                >
                                  Anexo {anexoIndex + 1}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/*<div className="text-xs text-gray-500 pt-2 border-t border-gray-100">*/}
                      {/*  ID da Ocorrência: {ocorrencia.ocoId} | ID: {ocorrencia.id}*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OcorrenciasAccordion;
