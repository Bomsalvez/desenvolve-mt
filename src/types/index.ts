export interface OcorrenciaEntrevDesapDTO {
  informacao: string;
  vestimentasDesaparecido: string;
}

export interface UltimaOcorrencia {
  dtDesaparecimento: string;
  dataLocalizacao: string;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: OcorrenciaEntrevDesapDTO;
}

export interface ListaCartaz {
  urlCartaz: string;
  tipoCartaz: string;
}

export interface PessoaDesaparecida {
  id: number;
  nome: string;
  idade: number;
  sexo: 'MASCULINO' | 'FEMININO';
  vivo: boolean;
  urlFoto: string;
  ultimaOcorrencia: UltimaOcorrencia;
  listaCartaz: ListaCartaz[];
  ocoId: number;
}

export interface InformacaoAdicional {
  id?: string;
  pessoaId: string;
  observacoes: string;
  localizacao: string;
  dataAvistamento: string;
  fotos: File[];
  contato: string;
  telefone: string;
}

export interface PaginationParams {
  page: number;
  size: number;
  sort?: string;
}

export interface SearchParams {
  nome?: string;
  status?: string;
  dataInicio?: string;
  dataFim?: string;
  local?: string;
}

export interface ApiResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface Estatisticas {
  quantPessoasDesaparecidas: number;
  quantPessoasEncontradas: number;
}

export interface Ocorrencia {
  ocoId: number;
  informacao: string;
  data: string;
  id: number;
  anexos: string[];
}
