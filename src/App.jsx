import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [apiData, setData] = useState([])

  const API_KEY = import.meta.env.VITE_API_KEY
  const API_URL = import.meta.env.VITE_API_URL

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
    // Após a variável item, utilize () não {} para carregar o html -> retorno automático
   <div>
      {apiData && apiData.map((item)=>(
        <div key={item.id}>
          <img src={item.urls.small} alt="" />
          <p>{item.alt_description}</p>
          
        </div>
      ))}
   </div>
  )
}

export default App
