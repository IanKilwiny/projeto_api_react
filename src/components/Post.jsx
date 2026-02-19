import "../css/Post.css"
import styled from "styled-components"

 const Conteiner = styled.div`
    width:31rem;
    height:auto;
    background-color:red;
  `
 
  const Image = styled.div`
    width:auto;
    height:30rem;
    background-size: cover;
    background-repeat: no-repeat 
  `

function Post({item}) {

 
  return (
   <Conteiner key={item.id}>
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
            <p>Likes: {item.likes}</p>
          </div>

          <div>
            <p>UserName: {item.user.username}</p>
          </div>
        </div>
       

   </Conteiner>


  )
}

export default Post
