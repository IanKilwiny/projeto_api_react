import styled from "styled-components"
import { useNavigate } from "react-router-dom"

 const Conteiner = styled.div`
  width: 100%;
  max-width: 31rem;
  background-color: #000000;
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


  const ConteinerText = styled.div`
    width: 100%;
    margin-left: 10px;
    font-size: large
  `


  const ConteinerDescription = styled.div`
    width: 100%;
    margin-left: 10px
  `


  const ConteinerUser = styled.div`
    width: auto;
    display:flex;
    align-itens:left;
    justify-content: flex-start;
    gap: 10px;
    max-width: 50%;
    min-width: 30%;
    overflow: hidden 
  `

  const ImageUser = styled.div`
    width: 4rem;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 5px
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

        <ConteinerText>
          <div>
            <p>{item.alt_description}</p>
          </div>

        </ConteinerText>

          <ConteinerDescription>
          
              <ConteinerUser>

                <ImageUser style={{
                  "backgroundImage":`url(${item.user.profile_image.small})`}}>
                </ImageUser>
               

                <p>@{item.user.username}</p>
              </ConteinerUser>
      

             <div>
              <p>❤️ {item.likes}</p>
             </div>
          
         </ConteinerDescription> 
       

   </Conteiner>

  )
}

export default Post
