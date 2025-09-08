# 🚨 Pessoas Desaparecidas - MT

Aplicação front-end para consulta de pessoas desaparecidas da Polícia Judiciária Civil de Mato Grosso.

## 📋 Descrição

Esta é uma **Single Page Application (SPA)** desenvolvida em React com TypeScript que permite aos cidadãos:

- **Consultar** registros de pessoas desaparecidas ou já localizadas
- **Enviar** informações adicionais (observações, localização, fotos) sobre essas pessoas
- **Navegar** por uma interface intuitiva e responsiva

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Roteamento**: React Router DOM
- **Formulários**: React Hook Form
- **Máscaras**: React Input Mask
- **Ícones**: Lucide React
- **Containerização**: Docker + Nginx
- **API**: Axios para comunicação com backend

## 📱 Funcionalidades

### ✅ Implementadas
- [x] **Tela Inicial** com cards de pessoas desaparecidas
- [x] **Paginação** (10 registros por página)
- [x] **Sistema de busca** com filtros avançados
- [x] **Página de detalhes** com informações completas
- [x] **Formulário para envio de informações** adicionais
- [x] **Upload de fotos** (máximo 5)
- [x] **Máscaras de entrada** para telefone
- **Layout responsivo** para todos os dispositivos
- **Lazy Loading** para otimização de performance
- **Tratamento de erros** de requisição

### 🔍 Filtros de Busca
- Nome da pessoa
- Status (Desaparecido/Localizado)
- Período de datas
- Local de desaparecimento

## 🛠️ Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Docker (opcional, para containerização)

## 📦 Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd desaparecidos-mt
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute em modo desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🐳 Execução com Docker

### Build e execução da aplicação
```bash
# Build da imagem
docker build -t desaparecidos-mt .

# Execução
docker run -p 3000:80 desaparecidos-mt
```

### Usando Docker Compose
```bash
# Execução em produção
docker-compose up -d

# Execução em desenvolvimento
docker-compose --profile dev up
```

## 🏗️ Scripts Disponíveis

```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Executa o linter
npm run test         # Executa os testes
```

## 🌐 API

A aplicação consome a API da Polícia Judiciária Civil de MT:

- **Base URL**: `https://abitus-api.geia.vip`
- **Documentação**: [Swagger UI](https://abitus-api.geia.vip/swagger-ui/index.html)

### Endpoints Utilizados
- `GET /pessoas` - Lista de pessoas com paginação e filtros
- `GET /pessoas/{id}` - Detalhes de uma pessoa específica
- `POST /informacoes` - Envio de informações adicionais

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Cabeçalho da aplicação
│   ├── PessoaCard.tsx  # Card de pessoa desaparecida
│   ├── SearchForm.tsx  # Formulário de busca
│   ├── Pagination.tsx  # Componente de paginação
│   └── InformacaoForm.tsx # Formulário de informações
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página inicial
│   └── PessoaDetalhes.tsx # Página de detalhes
├── services/           # Serviços e APIs
│   └── api.ts          # Configuração da API
├── types/              # Definições de tipos TypeScript
│   └── index.ts        # Interfaces e tipos
├── App.tsx             # Componente principal
└── main.tsx            # Ponto de entrada
```

## 🎨 Design System

### Cores
- **Primary**: Azul (#3b82f6)
- **Success**: Verde (#22c55e) 
- **Warning**: Amarelo (#f59e0b)
- **Gray**: Escala de cinzas para textos e backgrounds

### Componentes
- **Cards**: Sombras suaves, bordas arredondadas
- **Botões**: Estados hover, loading e disabled
- **Formulários**: Validação visual e feedback de erro
- **Responsividade**: Mobile-first com breakpoints do Tailwind

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload da pasta dist/
```

### Docker
```bash
docker build -t desaparecidos-mt .
docker run -p 80:80 desaparecidos-mt
```

## 🧪 Testes

```bash
# Executar testes unitários
npm run test

# Executar testes com UI
npm run test:ui

# Executar testes em modo watch
npm run test -- --watch
```

## 📊 Performance

- **Lazy Loading** de componentes e páginas
- **Code Splitting** automático com Vite
- **Otimização de imagens** com lazy loading
- **Compressão Gzip** no Nginx
- **Cache de arquivos estáticos**

## 🔒 Segurança

- **Headers de segurança** configurados no Nginx
- **Validação de formulários** no frontend
- **Sanitização de inputs** antes do envio
- **HTTPS** para comunicação com API

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto foi desenvolvido como teste técnico para a vaga de Desenvolvedor Pleno.

## 👨‍💻 Desenvolvedor

**Nome**: [Seu Nome]  
**Email**: [seu.email@exemplo.com]  
**LinkedIn**: [linkedin.com/in/seu-perfil]

---

## 🚨 Importante

Esta aplicação é destinada **APENAS** para fins educacionais e de teste técnico. 
Para informações reais sobre pessoas desaparecidas, entre em contato diretamente com a Polícia Judiciária Civil de Mato Grosso.

**Telefone de Emergência**: 190
