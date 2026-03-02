# 📸 Rede Social de Fotos

**Projeto desenvolvido por:** Ian Kilwiny & João Vitor  
**Disciplina:** PWEB2  
**Tecnologia:** React + Vite + Styled Components

---

## 📋 Índice

1. [Descrição do Projeto](#descrição-do-projeto)
2. [Estrutura de Pastas](#estrutura-de-pastas)
3. [Pré-requisitos e Instalação](#pré-requisitos-e-instalação)
4. [Configuração da API](#configuração-da-api)
5. [Tecnologias e Dependências](#tecnologias-e-dependências)
6. [Sistema de Rotas](#sistema-de-rotas)
7. [Componentes](#componentes)
8. [Funcionalidades](#funcionalidades)
9. [Scripts Disponíveis](#scripts-disponíveis)
10. [Como Usar](#como-usar)

---

## 🎯 Descrição do Projeto

Este projeto é uma **rede social moderna de compartilhamento de fotos**, inspirada em plataformas como **Pinterest** e **Instagram**. A aplicação consome a **API do Unsplash** para fornecer um catálogo extenso de imagens de alta qualidade.

### ✨ Principais Funcionalidades

- 📸 Visualização de galeria de fotos com layout em cascata responsivo
- ❤️ Sistema de curtidas para fotos
- 🔍 Busca avançada por nome de usuário, autor ou descrição
- 👤 Perfil detalhado do autor com informações e redes sociais
- 📱 Design responsivo para desktop, tablet e mobile
- ♾️ Infinite scroll para carregamento automático de mais imagens
- 🌙 Interface dark mode

---

## 📁 Estrutura de Pastas

```
projeto/
├── public/
│   └── imagens/              # Imagens estáticas do projeto
├── src/
│   ├── assets/              # Recursos visuais
│   ├── components/          # Componentes React
│   │   ├── Footer.jsx
│   │   ├── Home.jsx
│   │   ├── Post.jsx
│   │   ├── PostDetail.jsx
│   │   ├── ProfileDetails.jsx
│   │   └── SearchBar.jsx
│   ├── css/
│   │   ├── App.css
│   │   └── index.css
│   ├── App.jsx              # Componente principal com rotas
│   └── main.jsx             # Ponto de entrada da aplicação
├── .env.local               # Variáveis de ambiente (não commitado)
├── eslint.config.js         # Configuração do ESLint
├── package.json             # Dependências do projeto
├── vite.config.js           # Configuração do Vite
├── index.html              # HTML principal
└── README.md               # Este arquivo
```

---

## 🔧 Pré-requisitos e Instalação

### ✅ Pré-requisitos

- [Node.js](https://nodejs.org) v18+ 
- [NPM](https://www.npmjs.com/) ou Yarn
- Conta no [Unsplash](https://unsplash.com) para obter Access Key

### 📥 Passo a Passo de Instalação

**1. Clone o repositório:**
```bash
git clone <seu-repositório>
cd api
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Configure o arquivo `.env.local`:**
```bash
VITE_API_KEY=sua_chave_de_acesso_unsplash
```

**4. Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

---

## 🔑 Configuração da API

### Obtenção da Chave de API do Unsplash

1. Acesse [https://unsplash.com/developers](https://unsplash.com/developers)
2. Aceite os termos de uso
3. Preencha as informações do aplicativo
4. Copie seu **Access Key**
5. Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_API_KEY=sua_chave_aqui
```

### Endpoints Utilizados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/photos` | Lista fotos paginadas |
| GET | `/photos/:id` | Detalhes de uma foto específica |
| GET | `/users/:username` | Perfil de um usuário |
| GET | `/users/:username/photos` | Fotos de um usuário |

### Exemplo de Requisição

```javascript
fetch('https://api.unsplash.com/photos?page=1&per_page=20', {
  headers: {
    Authorization: `Client-ID ${API_KEY}`,
  },
})
```

---

## 📦 Tecnologias e Dependências

### Dependências Principais

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| **React** | ^19.2.0 | Biblioteca UI |
| **React DOM** | ^19.2.0 | Renderização DOM |
| **React Router DOM** | ^7.13.0 | Sistema de rotas |
| **Styled Components** | ^6.3.10 | CSS-in-JS para styling |
| **React Icons** | ^5.5.0 | Ícones SVG do Feather e FontAwesome |

### Dependências de Desenvolvimento

- Vite ^7.3.1 - Build tool
- ESLint ^9.39.1 - Linter
- @vitejs/plugin-react ^5.1.1 - Plugin React para Vite

---


### Configuração de Rotas

```jsx
// src/App.jsx
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/photo/:id" element={<PostDetail />} />
  </Routes>
</Router>
```

### Navegação Programática

```jsx
const navigate = useNavigate();

// Navegar para detalhes de uma foto
navigate(`/photo/${photoId}`);

// Voltar à página anterior
navigate(-1);
```

---

## 🧩 Componentes

### 1. **Home.jsx** - Página Principal

Componente que gerencia a galeria principal com infinite scroll e busca.

**Estado (Hooks):**
```jsx
const [apiData, setData] = useState([])        // Array de fotos
const [page, setPage] = useState(1)            // Página atual
const [isLoading, setLoading] = useState(false) // Status de carregamento
const [searchTerm, setSearchTerm] = useState('') // Termo de busca
```

**Funcionalidades:**
- Carregamento paginado de fotos (20 por página)
- Infinite scroll automático
- Filtragem por nome de usuário, autor ou descrição
- Prevenção de duplicatas

**Props:** Nenhuma

**Exemplo de Uso:**
```jsx
<Route path="/" element={<Home />} />
```

---

### 2. **Post.jsx** - Card de Foto

Componente individual de foto com informações do autor e sistema de curtidas.

**Props:**
```jsx
{
  item: {
    id: string,              // ID único da foto
    urls: { small: string }, // URL da imagem
    likes: number,           // Quantidade de curtidas
    user: {                  // Dados do autor
      username: string,      // Nome de usuário
      name: string,          // Nome completo
      profile_image: {       // Avatar do usuário
        small: string
      }
    }
  }
}
```

**Estado (Hooks):**
```jsx
const [liked, setLiked] = useState(false)    // Status de curtida
const [likes, setLikes] = useState(item.likes) // Contador de curtidas
```

**Funcionalidades:**
- Exibição de foto com hover effects
- Botão de curtir com animação
- Mostra nome de usuário do autor
- Contador de curtidas

**Exemplo de Uso:**
```jsx
<Post item={photoData} />
```

---

### 3. **PostDetail.jsx** - Página de Detalhes

Página completa com informações detalhadas da foto e galeria do autor.

**Parâmetros de Rota:**
```jsx
const { id } = useParams() // ID da foto da URL
```

**Estado (Hooks):**
```jsx
const [post, setPost] = useState(null)           // Dados da foto
const [otherPhotos, setOtherPhotos] = useState([]) // Outras fotos do autor
const [loading, setLoading] = useState(true)     // Status de carregamento
```

**Funcionalidades:**
- Exibição detalhada da foto
- Informações do autor em banner
- Galeria de outras fotos do mesmo autor
- Botão para voltar à página anterior
- Perfil social do autor integrado

**Props:** Nenhuma (usa URL params)

**Exemplo de Uso:**
```jsx
<Route path="/photo/:id" element={<PostDetail />} />
```

---

### 4. **SearchBar.jsx** - Barra de Pesquisa

Componente de busca com sticky positioning.

**Props:**
```jsx
{
  onSearch: (searchTerm: string) => void  // Callback para atualizar termo
}
```

**Funcionalidades:**
- Input sticky no topo da página
- Placeholder com dicas de busca
- Ícone de lupa
- Animação no focus
- Dark mode styling

**Exemplo de Uso:**
```jsx
<SearchBar onSearch={setSearchTerm} />
```

---

### 5. **ProfileDetails.jsx** - Perfil do Autor

Exibe informações detalhadas do perfil do usuário.

**Props:**
```jsx
{
  user: {
    name: string,                    // Nome completo
    username: string,                // Nome de usuário
    bio: string,                     // Biografia
    profile_image: {                 // Avatar
      large: string
    },
    total_photos: number,            // Total de fotos
    total_likes: number,             // Total de curtidas recebidas
    instagram_username?: string,     // Instagram (opcional)
    twitter_username?: string,       // Twitter (opcional)
    portfolio_url?: string           // Site pessoal (opcional)
  }
}
```

**Funcionalidades:**
- Avatar circular
- Links sociais: Instagram, Twitter, Portfolio
- Estatísticas do usuário
- Links abrem em nova aba

**Exemplo de Uso:**
```jsx
<ProfileDetails user={userData} />
```

---

### 6. **Footer.jsx** - Rodapé

Componente simples do rodapé da aplicação.

**Props:** Nenhuma

**Conteúdo:** Créditos - "PWEB2 - Ian e João Vitor"

**Exemplo de Uso:**
```jsx
<Footer />
```

---

## ⚙️ Funcionalidades Principais

### 🔄 Infinite Scroll

Carrega automaticamente mais fotos quando o usuário chega próximo ao final da página:

```jsx
useEffect(() => {
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200 &&
      !isLoading
    ) {
      setPage((p) => p + 1)
    }
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [isLoading])
```

### 🔍 Sistema de Busca

Filtra fotos por:
- Nome de usuário
- Nome do autor
- Descrição da imagem

```jsx
const filteredData = apiData.filter((item) => {
  const searchLower = searchTerm.toLowerCase()
  const username = item.user?.username?.toLowerCase() || ''
  const name = item.user?.name?.toLowerCase() || ''
  const description = item.alt_description?.toLowerCase() || ''
  
  return (
    username.includes(searchLower) ||
    name.includes(searchLower) ||
    description.includes(searchLower)
  )
})
```

### ❤️ Sistema de Curtidas

Cada foto tem seu próprio estado de curtida:

```jsx
const handleLike = () => {
  if (liked) {
    setLikes(likes - 1)
  } else {
    setLikes(likes + 1)
  }
  setLiked(!liked)
}
```

### 📐 Layout Responsivo

Gallery em cascata (CSS Columns):
- **4 colunas** em desktop (>1200px)
- **3 colunas** em telas médias (>900px)
- **2 colunas** em tablets (>600px)
- **1 coluna** em mobile (<600px)

---

## 💻 Iniciar projeto

```bash
# Inicia o servidor de desenvolvimento
npm run dev
```

---

## 🚀 Como Usar

### 1. Visualizar Fotos

Ao abrir a aplicação, você verá uma galeria de fotos em layout de cascata. Role para baixo para carregar mais imagens automaticamente.

### 2. Buscar Fotos

Use a barra de pesquisa no topo para filtrar por:
- Nome do fotógrafo
- Username
- Descrição da imagem

### 3. Curtir Fotos

Clique no botão de coração em qualquer foto para curtir. O contador será atualizado.

### 4. Ver Detalhes da Foto

Clique em qualquer foto para ver detalhes completos, informações do autor e sua galeria.

### 5. Explorar Perfil do Autor

Na página de detalhes, você pode:
- Ver avatar e biografia do fotógrafo
- Acessar suas redes sociais (Instagram, Twitter, Portfolio)
- Ver outras fotos do mesmo autor
- Conferir estatísticas (total de fotos e curtidas)

---

## 🎨 Styling com Styled Components



**Cores Principais:**
- Background: `#0f0f0f` (preto profundo)
- Accent: `#007bff` (azul)
- Text: `white` (branco)
- Border: `#222` (cinza escuro)

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_API_KEY=sua_chave_de_acesso_do_unsplash
```

**Nota:** Este arquivo não deve ser commitado no Git (já está no `.gitignore`)

---

## 🐛 Tratamento de Erros

A aplicação inclui tratamento de erros para requisições da API:

```jsx
.catch((error) => console.log('Erro na requisição: ' + error))
```

Em caso de erro, verifique:
1. Sua API Key está configurada corretamente
2. A chave está ativa no Unsplash?


---

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a qualquer tamanho de tela através de:
- Media queries no CSS
- Componentes Styled Components
- Layout flexbox e CSS Grid


---

## 👥 Contribuidores

- **Ian Kilwiny**
- **João Vitor**

**Disciplina:** Programação Web 2 (PWEB2)

---

## 📝 Notas Adicionais

- A aplicação carrega **20 fotos por página** da API Unsplash
- Possui prevenção de duplicatas ao carregar múltiplas páginas
- O estado de curtidas é apenas no frontend (não persiste no servidor)
- Imagens carregam com lazy loading automático via navegador
- Suporta navegação com browser back/forward button




