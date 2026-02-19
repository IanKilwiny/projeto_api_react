import { useEffect, useState } from 'react'
import Post from './Post'

function Home() {
  const [apiData, setData] = useState([])

  const API_URL = import.meta.env.VITE_API_URL
  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(()=>{

    fetch(`${API_URL}`,{
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
    
   <div className='home'>
      {apiData && apiData.map((item)=>(
        <Post item={item}/>
      ))}
   </div>
  )
}

export default Home
