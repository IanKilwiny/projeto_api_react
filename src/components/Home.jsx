import { useEffect, useState } from 'react'
import Post from './Post'
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

  const API_KEY = import.meta.env.VITE_API_KEY

  // fetch whenever the page number changes (first load and subsequent pages)
  useEffect(() => {
    setLoading(true)

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
        // append new items but skip ones already in state (by id) to prevent duplicates
        setData((prev) => {
          const existingIds = new Set(prev.map((i) => i.id))
          const filtered = data.filter((i) => !existingIds.has(i.id))
          return [...prev, ...filtered]
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

  return (
    <>
      <Conteiner className="home">
        {apiData &&
          apiData.map((item) => <Post key={item.id} item={item} />)}
      </Conteiner>
      {isLoading && <p style={{ textAlign: 'center' }}>Carregando...</p>}
    </>
  )
}

export default Home
