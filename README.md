# MyWallet (back-end)

API de controle financeiro pessoal: cada usuário se cadastra, faz login e registra suas entradas e saídas. Existe um [front-end](https://github.com/MilenaKozima/projeto14-mywallet-front) que consome esta API.

## Tecnologias

- Node.js e Express
- MongoDB (driver oficial `mongodb`)
- bcrypt (criptografia de senhas)
- Joi (validação dos dados)
- uuid (tokens de sessão)
- Day.js

## Funcionalidades

- Cadastro com senha criptografada e e-mail único
- Login com geração de token de sessão
- Rotas protegidas por token (middleware de autenticação)
- Registro e listagem de transações do usuário logado, da mais recente para a mais antiga
- Logout, que apaga a sessão

## Estrutura

```
src/
├── controllers/   # regras de cada rota
├── database/      # conexão com o MongoDB
├── middlewares/   # validação de schema e de autenticação
├── routes/
└── schemas/       # schemas Joi
```

Coleções: `users`, `sessions` e `transaction`.

## Como rodar

```bash
git clone https://github.com/MilenaKozima/projeto14-mywallet-back.git
cd projeto14-mywallet-back
npm install
```

Crie um arquivo `.env` na raiz:

```
DATABASE_URL=mongodb://localhost:27017/mywallet
PORT=5000
```

Inicie o servidor:

```bash
npm run dev
```

## Rotas

Rotas marcadas com 🔒 exigem o cabeçalho `Authorization: Bearer <token>`.

| Método | Rota | Corpo | Respostas |
|---|---|---|---|
| POST | `/cadastro` | `{ name, email, password }` | 201, 409 (e-mail já cadastrado), 422 (dados inválidos) |
| POST | `/login` | `{ email, password }` | 200 `{ token, userName }`, 401 (senha incorreta), 404 (e-mail não cadastrado), 422 |
| POST | `/logout` 🔒 | — | 204, 401 |
| GET | `/transaction` 🔒 | — | 200 (lista de transações), 401 |
| POST | `/transaction` 🔒 | `{ value, description, type }` | 201, 401, 422 |

`type` aceita `income` (entrada) ou `expense` (saída). `value` é um número positivo com até 2 casas decimais.
