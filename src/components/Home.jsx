import { useEffect, useState } from 'react'
import Post from './Post'
import SearchBar from './SearchBar'
import styled from 'styled-components'


const Conteiner = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 1rem;

  column-count: 4;
  column-gap: 20px;

  @media (max-width: 1200px) {
    column-count: 3;
  }

  @media (max-width: 900px) {
    column-count: 2;
  }

  @media (max-width: 600px) {
    column-count: 1;
  }
`

function Home() {
  const [apiData, setData] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const API_KEY = import.meta.env.VITE_API_KEY

  // recarrega a cada mudança de página única vez
  useEffect(() => {
    setLoading(true)

    // page conta começa em 1, per_page é 20, então a cada nova página são carregados mais 20 itens
    fetch(`https://api.unsplash.com/photos?page=${page}&per_page=20`, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Erro ${response.status}: Servidor não retornou JSON.`)

        return response.json()
      })
      .then((data) => {
        console.log('page', page, data)

        // evita duplicatas, caso a API retorne itens repetidos em páginas diferentes
        setData((prev) => {
          const existingIds = new Set(prev.map((i) => i.id)) // cria um Set com os IDs já existentes no estado
          const filtered = data.filter((i) => !existingIds.has(i.id)) // filtra os novos itens, mantendo apenas os que não estão no Set
          return [...prev, ...filtered] // concatena os itens filtrados com os anteriores, garantindo que não haja duplicatas
        })
      })
      .catch((error) => console.log('Erro na requisição: ' + error))
      .finally(() => setLoading(false))
  }, [page])

  // infinite scroll handler
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

  return (
    <>
      <SearchBar onSearch={setSearchTerm} />
      <Conteiner className="home">
        {filteredData.length > 0 ? (
          filteredData.map((item) => <Post key={item.id} item={item} />)
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1', width: '100%', fontSize: '24px', marginTop: '40px', color: '#999' }}>Imagem Inexistente</p>
        )}
      </Conteiner>
      {isLoading && <p style={{ textAlign: 'center' }}>Carregando...</p>}
    </>
  )
}

export default Home
