import "../css/Post.css"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

 const Conteiner = styled.div`
  width: 100%;
  max-width: 31rem;
  background-color: #1e1e1e;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  }
  `
 
  const Image = styled.div`
  width: 100%;
  height: 30rem;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  `

function Post({item}) {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/photo/${item.id}`)
  }

 
  return (
   <Conteiner onClick={handleClick}>
        <Image
          style={{
            "backgroundImage": `url(${item.urls.small})`
          }}      
        />

        <div>
          <div>
            <p>{item.alt_description}</p>
          </div>

          <div>
            <p>❤️ {item.likes}</p>
          </div>

          <div>
            <p>👤 {item.user.username}</p>
          </div>
        </div>
       

   </Conteiner>

   


  )
}

export default Post
