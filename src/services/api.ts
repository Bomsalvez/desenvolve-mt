import axios from 'axios';
import { PessoaDesaparecida, InformacaoAdicional, PaginationParams, SearchParams, ApiResponse, Estatisticas, Ocorrencia } from '../types';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config?.url, response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.config?.url, error.response?.status, error.message);
    
    if (error.response?.status === 403) {
      throw new Error('Acesso negado (403). Verifique se a API está acessível publicamente.');
    } else if (error.response?.status === 404) {
      throw new Error('Recurso não encontrado');
    } else if (error.response?.status >= 500) {
      throw new Error('Erro interno do servidor');
    } else {
      throw new Error(error.response?.data?.message || 'Erro na requisição');
    }
  }
);

export const pessoasApi = {
  // Buscar pessoas desaparecidas com paginação e filtros
  buscar: async (params: PaginationParams & SearchParams): Promise<any> => {
    const response = await api.get('/pessoas/aberto/filtro', { params });
    return response.data;
  },

  // Buscar pessoa por ID
  buscarPorId: async (id: string): Promise<any> => {
    const response = await api.get(`/pessoas/${id}`);
    return response.data;
  },

  // Buscar estatísticas
  buscarEstatisticas: async (): Promise<Estatisticas> => {
    const response = await api.get('/pessoas/aberto/estatistico');
    return response.data;
  },

  // Buscar ocorrências de uma pessoa
  buscarOcorrencias: async (ocoId: number): Promise<Ocorrencia[]> => {
    const response = await api.get(`/ocorrencias/informacoes-desaparecido?ocorrenciaId=${ocoId}`);
    console.log(response);
    return response.data;
  },

  // Enviar informações adicionais
  enviarInformacao: async (informacao: InformacaoAdicional, ocoId: number): Promise<any> => {
    const formData = new FormData();
    
    console.log('Dados recebidos:', informacao);
    console.log('ocoId:', ocoId);

    // Parâmetros obrigatórios conforme documentação da API
    formData.append('informacao', informacao.observacoes);
    formData.append('descricao', `Informação sobre ${informacao.localizacao} - ${informacao.contato}`);
    formData.append('data', informacao.dataAvistamento);
    
    // Verificar se os dados foram adicionados ao FormData
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // Adicionar arquivos
    if (informacao.fotos && informacao.fotos.length > 0) {
      informacao.fotos.forEach((foto, index) => {
        formData.append('files', foto);
        console.log(`Arquivo ${index + 1} adicionado:`, foto.name);
      });
    } else {
      console.log('Nenhum arquivo para adicionar');
    }
    
    console.log('FormData final entries:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // Usar query parameters para ocoId conforme documentação da API
    const response = await api.post(`/ocorrencias/informacoes-desaparecido?ocoId=${ocoId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api;
