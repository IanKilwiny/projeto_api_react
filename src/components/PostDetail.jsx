import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import ProfileDetails from './ProfileDetails'
import ImageWithDownload from './ImageWithDownload'
import Footer from './Footer'
import styled from 'styled-components'
import Post from './Post'

/* ================= ESTILOS ================= */

const Page = styled.div`
  background: #0f0f0f;
  min-height: 100vh;
  color: white;
`

const Header = styled.div`
  background: #111;
  padding: 15px 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid #222;
`

const BackButton = styled.button`
  background: #007bff;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
`

const ProfileBanner = styled.div`
  position: relative;
  height: 300px;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
`

const ProfileInfo = styled.div`
  max-width: 1000px;
  margin: -80px auto 0;
  padding: 0 20px;
  position: relative;
`

const Gallery = styled.div`
  max-width: 1000px;
  margin: 60px auto;
  padding: 0 20px;

  h2 {
    margin-bottom: 20px;
    grid-column: 1 / -1;
  }

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }
`

/* ================= COMPONENTE ================= */

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [otherPhotos, setOtherPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY

    fetch(`https://api.unsplash.com/photos/${id}`, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setPost(data)

        return fetch(
          `https://api.unsplash.com/users/${data.user.username}/photos`,
          {
            headers: {
              Authorization: `Client-ID ${API_KEY}`
            }
          }
        )
      })
      .then(res => res.json())
      .then(userPhotos => {
        setOtherPhotos(userPhotos)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <Page>Carregando...</Page>
  if (!post) return <Page>Post não encontrado</Page>

  return (
    <Page>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <FiArrowLeft />
          Voltar
        </BackButton>
      </Header>

      <ProfileBanner bg={post.urls.full} />

      <ProfileInfo>
        <ProfileDetails user={post.user} />

        <ImageWithDownload src={post.urls.regular} downloadLink={post.links.download} />
      </ProfileInfo>

      <Gallery>
        <h2>Outras Fotos</h2>
        {otherPhotos.map(photo => (

          <Post key={photo.id} item={photo} />
        ))}
      </Gallery>

      <Footer />
    </Page>
  )
}

export default PostDetail