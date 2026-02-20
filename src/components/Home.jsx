import { useEffect, useState } from 'react'
import Post from './Post'
import styled from 'styled-components'


const Conteiner = styled.div`
    width: 100%;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: 1200px;
    margin: 2rem auto; /* centraliza e cria espaço */
`

function Home() {
  const [apiData, setData] = useState([])

  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(()=>{

    fetch("https://api.unsplash.com/photos/",{
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
