# API REST Pix Generator

Uma aplicação backend robusta para gerenciamento de usuários e transações PIX, desenvolvida com Fastify, TypeScript e SQLite.

## Descrição

A API REST Pix Generator é uma solução completa para gerenciar dados de usuários e suas transações PIX. O projeto oferece funcionalidades de criar, listar e atualizar usuários, gerenciar fotos de perfil e registrar transações PIX com informações detalhadas do cliente.

## Problema que Resolve

Este projeto resolve a necessidade de uma API eficiente e segura para:

1. **Gerenciamento de Usuários**: Criação, leitura e atualização de perfis de usuário com validação rigorosa de dados
2. **Upload de Mídia**: Armazenamento seguro de fotos de perfil com geração automática de IDs únicos
3. **Registro de Transações PIX**: Armazenamento estruturado de dados de transações PIX associadas aos usuários
4. **Integridade de Dados**: Uso de migrações versionadas para manutenção consistente do esquema do banco de dados
5. **Type Safety**: Validação de tipos em tempo de compilação e validação de dados em tempo de execução

## Demonstração

A aplicação expõe endpoints RESTful para operações CRUD completas:

```
┌─────────────────────────────────────────────────────────┐
│                    Cliente API                          │
└────────────┬────────────────────────────────────────────┘
             │
      ┌──────┴──────┐
      │              │
      ▼              ▼
┌───────────────┐  ┌──────────────────┐
│  /users       │  │ /transactions-pix│
│  (CRUD)       │  │ (CRUD)           │
└───────────────┘  └──────────────────┘
      │                     │
      ▼                     ▼
 ┌─────────────────────────────────┐
 │     SQLite Database             │
 │  ┌─────────────┐ ┌───────────┐  │
 │  │    users    │ │transactions│ │
 │  └─────────────┘ └───────────┘  │
 └─────────────────────────────────┘
```

## Tecnologias Utilizadas

| Categoria                 | Tecnologia         | Versão | Propósito                                  |
| ------------------------- | ------------------ | ------ | ------------------------------------------ |
| **Runtime**               | Node.js            | -      | Ambiente de execução                       |
| **Linguagem**             | TypeScript         | 5.3.3  | Type safety e melhor developer experience  |
| **Framework Web**         | Fastify            | 4.25.2 | Servidor HTTP de alta performance          |
| **Banco de Dados**        | SQLite3            | 5.1.6  | Banco de dados relacional leve e embarcado |
| **Query Builder**         | Knex.js            | 3.1.0  | Construção de queries e migrações          |
| **Validação**             | Zod                | 3.22.4 | Validação de schemas em TypeScript         |
| **Middleware**            | @fastify/cors      | 8.5.0  | CORS para requisições cross-origin         |
| **Middleware**            | @fastify/multipart | 8.0.0  | Upload de múltiplos arquivos               |
| **Middleware**            | @fastify/static    | 6.12.0 | Servir arquivos estáticos                  |
| **Variáveis de Ambiente** | dotenv             | 16.3.1 | Gerenciamento de configurações             |
| **Testes**                | Vitest             | 1.1.1  | Framework de testes unitários              |
| **Testes (HTTP)**         | Supertest          | 6.3.3  | Testes de requisições HTTP                 |
| **Linter**                | ESLint             | -      | Análise estática de código                 |
| **Compilador**            | tsx                | 4.7.0  | Execução TypeScript com watch              |

## Arquitetura do Projeto

### Padrão de Arquitetura: RESTful API em Camadas

O projeto utiliza uma arquitetura modular em camadas que separa as responsabilidades:

```
┌───────────────────────────────────────────────────┐
│              Camada de Apresentação                │
│          (Routes - Endpoints HTTP)                 │
├───────────────────────────────────────────────────┤
│         Camada de Lógica de Negócio                │
│      (Validação com Zod, Lógica de Routes)        │
├───────────────────────────────────────────────────┤
│         Camada de Acesso a Dados                   │
│      (Knex.js - Query Builder)                    │
├───────────────────────────────────────────────────┤
│        Camada de Persistência                      │
│      (SQLite - Banco de Dados)                    │
└───────────────────────────────────────────────────┘
```

### Fluxo de Requisição

```
1. Cliente faz requisição HTTP
           │
           ▼
2. Fastify recebe a requisição
           │
           ▼
3. Middleware (CORS, Multipart, etc)
           │
           ▼
4. Route Handler
           │
           ▼
5. Validação com Zod
           │
           ▼
6. Knex.js executa query no SQLite
           │
           ▼
7. Resposta JSON retorna ao cliente
```

### Características da Arquitetura

- **Modularidade**: Routes separadas por domínio (users, transactions)
- **Type Safety**: TypeScript assegura tipos em tempo de compilação
- **Validação em Tempo Real**: Zod valida dados de entrada
- **Separação de Responsabilidades**: Database, Routes, e Config em módulos distintos
- **Escalabilidade**: Estrutura permite adicionar novos recursos facilmente
- **Testabilidade**: Arquitetura favorece testes unitários e de integração

## Estrutura de Pastas

```
api-rest-pix-generator/
├── db/
│   └── migrations/               # Migrações do banco de dados versionadas
│       ├── 20240103194714_create-users.ts
│       └── 20240108163442_create-transactionsPix.ts
├── src/
│   ├── @types/                  # Definições de tipos customizadas
│   │   └── knex.d.ts           # Tipos estendidos do Knex
│   ├── env/
│   │   └── index.ts            # Configuração e validação de variáveis de ambiente
│   ├── routes/                 # Rotas da API organizadas por domínio
│   │   ├── users.ts            # Endpoints de usuários (CRUD + upload)
│   │   └── transactionsPix.ts  # Endpoints de transações PIX
│   ├── upload/
│   │   └── profilePicture/     # Armazenamento de fotos de perfil enviadas
│   ├── app.ts                  # Configuração principal do Fastify
│   ├── database.ts             # Configuração do Knex e SQLite
│   └── server.ts               # Ponto de entrada do servidor
├── test/
│   ├── users.spec.ts           # Testes das rotas de usuários
│   └── transactionsPix.spec.ts # Testes das rotas de transações PIX
├── node_modules/               # Dependências do projeto
├── .env                        # Variáveis de ambiente (não versionado)
├── .env.example                # Template de variáveis de ambiente
├── .env.test                   # Variáveis de ambiente para testes
├── .eslintrc.json              # Configuração do ESLint
├── knexfile.ts                 # Configuração do Knex (referencia database.ts)
├── tsconfig.json               # Configuração do TypeScript
├── package.json                # Dependências e scripts
└── README.md                   # Este arquivo
```

### Responsabilidades por Pasta

| Pasta             | Responsabilidade                                     |
| ----------------- | ---------------------------------------------------- |
| **db/migrations** | Versionamento e evolução do schema do banco de dados |
| **src/routes**    | Definição de endpoints e lógica de requisição        |
| **src/env**       | Carregamento e validação de variáveis de ambiente    |
| **src/upload**    | Armazenamento de arquivos enviados pelos usuários    |
| **src**           | Configuração central (app, database, server)         |
| **test**          | Suite de testes automatizados                        |

## Como Rodar o Projeto Localmente

### Pré-requisitos

- **Node.js**: Versão 18.0.0 ou superior
- **npm**: Versão 9.0.0 ou superior (incluído com Node.js)
- **Git**: Para clonar o repositório (opcional)

Verificar versões instaladas:

```bash
node --version
npm --version
```

### Instalação

1. **Clone o repositório** (se aplicável):

```bash
git clone https://github.com/seu-usuario/api-rest-pix-generator.git
cd api-rest-pix-generator
```

2. **Instale as dependências**:

```bash
npm install
```

3. **Configure as variáveis de ambiente**:

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure as variáveis necessárias:

```
NODE_ENV=development
DATABASE_URL=./db.sqlite
PORT=3333
```

| Variável       | Descrição                                            | Padrão      |
| -------------- | ---------------------------------------------------- | ----------- |
| `NODE_ENV`     | Ambiente de execução (development, test, production) | production  |
| `DATABASE_URL` | Caminho para o arquivo SQLite                        | ./db.sqlite |
| `PORT`         | Porta do servidor HTTP                               | 3333        |

4. **Execute as migrações do banco de dados**:

```bash
npm run knex migrate:latest
```

### Scripts Disponíveis

```bash
# Inicia o servidor em modo desenvolvimento com watch
npm run dev

# Executa testes automatizados
npm test

# Executa testes com watch mode
npm test -- --watch

# Verifica linting e corrige problemas automáticos
npm run lint

# Executa migrações do Knex (usar com argumentos)
npm run knex <comando>

# Exemplos de comandos Knex
npm run knex migrate:latest      # Executa todas as migrações pendentes
npm run knex migrate:rollback    # Reverte última migração
npm run knex migrate:rollback --all  # Reverte todas as migrações
npm run knex migrate:make --name <nome> # Cria nova migração
```

## Exemplos de Uso da Aplicação

### 1. Criar um Novo Usuário

**Requisição:**

```bash
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "cpf": "12345678910",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

**Resposta (201 Created):**

```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 2. Listar Todos os Usuários

**Requisição:**

```bash
curl http://localhost:3333/users
```

**Resposta (200 OK):**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "cpf": "12345678910",
    "email": "joao@example.com",
    "password": "senha123",
    "profilePicture": null,
    "created_at": "2024-01-03 19:47:14"
  }
]
```

### 3. Atualizar um Usuário

**Requisição:**

```bash
curl -X PUT http://localhost:3333/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Updated",
    "cpf": "12345678910",
    "email": "joao.updated@example.com",
    "password": "novaSenha123"
  }'
```

**Resposta (200 OK):**

```
Status vazio
```

### 4. Upload de Foto de Perfil

**Requisição:**

```bash
curl -X POST http://localhost:3333/users/upload-profile-picture \
  -F "file=@/caminho/para/foto.jpg"
```

**Resposta (200 OK):**

```json
{
  "message": "files uploaded",
  "paths": [
    "./src/upload/profilePicture/550e8400-e29b-41d4-a716-446655440000.jpg"
  ]
}
```

**Acessar foto via URL:**

```
http://localhost:3333/uploads/550e8400-e29b-41d4-a716-446655440000.jpg
```

### 5. Criar Transação PIX

**Requisição:**

```bash
curl -X POST http://localhost:3333/transactions-pix \
  -H "Content-Type: application/json" \
  -d '{
    "nameClient": "Marcos Antonio",
    "keyPix": "77988695668",
    "valuePix": "110,40",
    "city": "Vitoria da Conquista",
    "description": "Desenvolvimento App",
    "idUser": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

**Resposta (201 Created):**

```
Status vazio
```

### 6. Listar Todas as Transações PIX

**Requisição:**

```bash
curl http://localhost:3333/transactions-pix
```

**Resposta (200 OK):**

```json
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "João Silva",
    "email": "joao@example.com",
    "cpf": "12345678910",
    "nameClient": "Marcos Antonio",
    "keyPix": "77988695668",
    "valuePix": "110,40",
    "city": "Vitoria da Conquista",
    "description": "Desenvolvimento App",
    "idUser": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2024-01-08 16:34:42"
  }
]
```

### 7. Listar Transações de um Usuário Específico

**Requisição:**

```bash
curl http://localhost:3333/transactions-pix/550e8400-e29b-41d4-a716-446655440000
```

**Resposta (200 OK):**

```json
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "João Silva",
    "email": "joao@example.com",
    "cpf": "12345678910",
    "nameClient": "Marcos Antonio",
    "keyPix": "77988695668",
    "valuePix": "110,40",
    "city": "Vitoria da Conquista",
    "description": "Desenvolvimento App",
    "idUser": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2024-01-08 16:34:42"
  }
]
```

## Endpoints da API

### Usuários

| Método | Caminho                         | Descrição                    | Status      |
| ------ | ------------------------------- | ---------------------------- | ----------- |
| `GET`  | `/users`                        | Lista todos os usuários      | 200 OK      |
| `POST` | `/users`                        | Cria um novo usuário         | 201 Created |
| `PUT`  | `/users/:id`                    | Atualiza dados do usuário    | 200 OK      |
| `POST` | `/users/upload-profile-picture` | Faz upload de foto de perfil | 200 OK      |

#### Esquema de Validação - Criar/Atualizar Usuário

```typescript
{
  name: string; // Nome do usuário (obrigatório)
  cpf: string; // CPF do usuário (obrigatório)
  email: string; // Email do usuário (obrigatório)
  password: string; // Senha do usuário (obrigatório)
}
```

### Transações PIX

| Método | Caminho                 | Descrição                                 | Status      |
| ------ | ----------------------- | ----------------------------------------- | ----------- |
| `GET`  | `/transactions-pix`     | Lista todas as transações PIX             | 200 OK      |
| `GET`  | `/transactions-pix/:id` | Lista transações de um usuário específico | 200 OK      |
| `POST` | `/transactions-pix`     | Cria nova transação PIX                   | 201 Created |

#### Esquema de Validação - Criar Transação PIX

```typescript
{
  nameClient: string; // Nome do cliente (obrigatório)
  keyPix: string; // Chave PIX (obrigatório)
  valuePix: string; // Valor da transação (obrigatório)
  city: string; // Cidade (obrigatório)
  description: string; // Descrição da transação (obrigatório)
  idUser: string; // ID do usuário relacionado (obrigatório)
}
```

### Filtragem de Arquivos Estáticos

| Caminho              | Descrição                          |
| -------------------- | ---------------------------------- |
| `/uploads/:filename` | Acessa fotos de perfil uploadeadas |

**Exemplo:**

```bash
curl http://localhost:3333/uploads/550e8400-e29b-41d4-a716-446655440000.jpg
```

## Boas Práticas Utilizadas no Projeto

### 1. Type Safety com TypeScript

```typescript
// Tipos explícitos evitam erros em tempo de desenvolvimento
const userId: string = req.userId;
```

### 2. Validação com Zod

```typescript
// Validação declarativa e reutilizável
const createUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  email: z.string(),
  password: z.string(),
});
```

### 3. Geração de IDs Únicos

```typescript
// Uso de UUID para evitar conflitos
import { randomUUID } from "crypto";
const id = randomUUID();
```

### 4. Migrações Versionadas

```typescript
// Histórico rastreável de mudanças no schema
// Podem ser revertidas e replicadas em outros ambientes
```

### 5. Separação de Configurações

```typescript
// Variáveis de ambiente validadas com Zod
// Diferentes configurações por ambiente (dev, test, prod)
```

### 6. Logging e Debugging

```typescript
console.log("Caminho do diretório estático:", staticPath);
// Rastreamento de operações importantes
```

### 7. Tratamento de Arquivos Seguro

```typescript
// Limite de tamanho de arquivo (5MB)
// Geração de nomes únicos com UUID
// Streaming com pipeline para eficiência de memória
```

### 8. CORS Habilitado

```typescript
// Permite requisições de diferentes origens
// Necessário para applications frontend separadas
```

### 9. Testes Automatizados

```typescript
// Suite de testes com Vitest e Supertest
// Garante que refatorações não quebram funcionalidades
```

### 10. Code Linting

```bash
npm run lint
// ESLint mantém consistência de código
```

### 11. Hooks de Requisição

```typescript
// Middleware customizado para userId
// Reutilização de lógica transversal
```

### 12. Query Builder (Knex)

```typescript
// SQL type-safe
// Prevenção de SQL injection
// Sintaxe limpa e legível
```

## Possíveis Melhorias Futuras

### Segurança

- [ ] Implementar autenticação com JWT
- [ ] Hash de senhas com bcrypt
- [ ] Validação de CPF (verificar dígitos verificadores)
- [ ] Rate limiting para prevenir abuso
- [ ] HTTPS obrigatório em produção
- [ ] Sanitização de entrada contra XSS
- [ ] CSRF protection

### Performance

- [ ] Cache com Redis para queries frequentes
- [ ] Paginação em endpoints de listagem
- [ ] Índices no banco de dados
- [ ] Compressão de respostas com gzip
- [ ] CDN para servir imagens de perfil
- [ ] Database connection pooling

### Funcionalidades

- [ ] Soft delete de usuários
- [ ] Histórico de transações com filtros avançados
- [ ] Estatísticas de uso do PIX
- [ ] Relatórios exportáveis (PDF/CSV)
- [ ] Notificações por email
- [ ] Sistema de permissões e roles
- [ ] Auditoria de operações

### Qualidade de Código

- [ ] Aumentar coverage de testes (target 80%+)
- [ ] Testes de integração end-to-end
- [ ] Documentação com Swagger/OpenAPI
- [ ] CI/CD pipeline (GitHub Actions, GitLab CI)
- [ ] Containerização com Docker
- [ ] Monitoring e Observability (NewRelic, DataDog)

### DevOps

- [ ] Docker Compose para desenvolvimento
- [ ] Kubernetes manifests para produção
- [ ] Helm charts para deploy
- [ ] GitHub Actions para CI/CD
- [ ] Secrets management
- [ ] Blue-green deployment

### Arquitetura

- [ ] Injeção de dependência
- [ ] Padrão Repository
- [ ] Services layer
- [ ] Error handling customizado
- [ ] Documentação de API com OpenAPI 3.0
- [ ] Structured logging

## Ambiente de Desenvolvimento

### Stack Recomendado

Para melhor experience de desenvolvimento, recomenda-se:

- **Editor**: VS Code com extensões

  - ES7+ React/Redux/GraphQL/React-Native snippets
  - Prettier - Code formatter
  - ESLint
  - Thunder Client ou REST Client

- **Browser**: Chrome/Firefox com DevTools

- **Terminal**: PowerShell (Windows), Bash (Linux/Mac)

### Dicas de Desenvolvimento

1. Use `npm run dev` para desenvolvimento com auto-reload
2. Abra dois terminais: um para servidor, outro para testes
3. Use `npm test -- --watch` para TDD
4. ESLint catch erros antes de runtime
5. Inspecione requests com REST Client no VS Code

## Diagrama de Entidade-Relacionamento

```
┌─────────────────────────────────────────┐
│              users                      │
├─────────────────────────────────────────┤
│ id (UUID) [PK]                          │
│ name (TEXT)                             │
│ email (TEXT)                            │
│ cpf (TEXT)                              │
│ password (TEXT)                         │
│ profilePicture (TEXT) [nullable]        │
│ created_at (TIMESTAMP)                  │
└──────────────────┬──────────────────────┘
                   │
                   │ 1:N
                   │
┌──────────────────▼──────────────────────┐
│          transactionsPix                │
├─────────────────────────────────────────┤
│ id (UUID) [PK]                          │
│ nameClient (TEXT)                       │
│ keyPix (TEXT)                           │
│ valuePix (TEXT)                         │
│ city (TEXT)                             │
│ description (TEXT)                      │
│ idUser (TEXT) [FK -> users.id]          │
│ created_at (TIMESTAMP)                  │
└─────────────────────────────────────────┘
```

## Fluxo de Desenvolvimento

```
1. Desenvolvimento Local
   npm run dev

2. Execução de Testes
   npm test

3. Linting e Formatação
   npm run lint

4. Build para Produção
   npm run build (a ser implementado)

5. Deploy
   Push para repositório
   CI/CD executa testes e deploy automático
```

## Resolução de Problemas Comuns

### "Database locked"

```bash
# Certifique-se que não há múltiplos processos acessando o SQLite
# Feche outros terminals rodando o servidor
```

### "Port already in use"

```bash
# Mude a PORT no .env
# Ou mate o processo usando a porta
# Windows: netstat -ano | findstr :3333
# Linux/Mac: lsof -i :3333
```

### "Migration failed"

```bash
# Reverta todas as migrações primeiro
npm run knex migrate:rollback --all

# Depois execute novamente
npm run knex migrate:latest
```

### "Files not found"

```bash
# Certifique-se que o diretório de upload existe
mkdir -p src/upload/profilePicture
```

## Contribuindo com o Projeto

1. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
2. Commit suas mudanças (`git commit -am 'Add nova feature'`)
3. Push para a branch (`git push origin feature/MinhaFeature`)
4. Abra um Pull Request

### Checklist antes de submeter PR

- [ ] Código passa em `npm run lint`
- [ ] Testes passam em `npm test`
- [ ] Nova funcionalidade tem testes associados
- [ ] Documentação foi atualizada
- [ ] Commits estão bem estruturados
- [ ] Não há console.log em produção

## Licença

ISC - Veja o arquivo package.json para detalhes completos.

## Autor

Desenvolvido como uma aplicação REST para gerenciamento de usuários e transações PIX.
