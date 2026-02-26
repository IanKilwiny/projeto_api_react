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

  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(()=>{

    fetch("https://api.unsplash.com/photos?per_page=100",{
      headers:{
        "Authorization": `Client-ID ${API_KEY}`
      
      }
    })

    .then(response => {
        if (!response.ok) throw new Error(`Erro ${response.status}: Servidor não retornou JSON.`);

        return response.json()
    })

    .then(data => {
      console.log(data)
      setData(data)
    
    })


    .catch(error => console.log("Erro na requisição: "+error))


  }, [])

  

  return (
    
   <Conteiner className='home'>
      {apiData && apiData.map((item)=>(
        <Post item={item}/>
      ))}
   </Conteiner>
  )
}

export default Home
