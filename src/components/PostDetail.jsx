import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #121212;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Card = styled.div`
  position: relative; /* adicione isso */
  max-width: 800px;
  width: 100%;
  background-color: #1e1e1e;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
`

const Image = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
`

const Content = styled.div`
  padding: 30px;
`

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 15px;
  color: #fff;
`

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 20px;
  flex-wrap: wrap;

  p {
    margin: 10px 0;
    font-size: 16px;
  }
`

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`

const DownloadButton = styled.a`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  cursor: pointer;
  transition: all 0.3s ease;

  animation: float 2s ease-in-out infinite;

  &:hover {
    background: #007bff;
    transform: scale(1.1) rotate(-10deg);
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
    100% { transform: translateY(0px); }
  }
`

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY

    fetch(`https://api.unsplash.com/photos/${id}`, {
      headers: {
        'Authorization': `Client-ID ${API_KEY}`
      }
    })
      .then(response => {
        if (!response.ok) throw new Error(`Erro ${response.status}`)
        return response.json()
      })
      .then(data => {
        setPost(data)
        setLoading(false)
      })
      .catch(error => {
        console.log('Erro na requisição: ' + error)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <Container><p>Carregando...</p></Container>
  }

  if (!post) {
    return <Container><p>Post não encontrado</p></Container>
  }

  return (
    <Container>
      <Card>
        <DownloadButton 
          href={post.links.download} 
          target="_blank"
          rel="noopener noreferrer"
        >
        <FiDownload />
      </DownloadButton>

      
        <Image src={post.urls.regular} alt={post.alt_description} />
        <Content>
          <Title>{post.alt_description || 'Sem título'}</Title>
          
          <Info>
            <div>
              <p><strong>❤️ Likes:</strong> {post.likes}</p>
              <p><strong>👤 Usuário:</strong> {post.user.username}</p>
              <p><strong>📍 Localização:</strong> {post.user.location || 'Não informada'}</p>
            </div>
            <div>
              <p><strong>📸 Câmera:</strong> {post.exif?.model || 'Não informada'}</p>
              <p><strong>🔗 Downloads:</strong> {post.downloads}</p>
            </div>
          </Info>

          <Button onClick={() => navigate('/')}>← Voltar</Button>
        </Content>
      </Card>
    </Container>
  )
}

export default PostDetail
