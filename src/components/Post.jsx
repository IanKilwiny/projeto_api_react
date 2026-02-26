import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { FiHeart, FiUser } from "react-icons/fi"
import { FaHeart } from "react-icons/fa"
import { useState } from "react"

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  display: inline-block;
  border-radius: 16px;
  overflow: hidden;
  break-inside: avoid;
  cursor: pointer;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;

  &:hover img {
    transform: scale(1.05);
  }
`

const Image = styled.img`
  width: 100%;
  height: 30rem;
  object-fit: cover;
  transition: transform 0.4s ease;
`

const OverlayTop = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  z-index: 2;
`

const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(6px);
  padding: 6px 12px;
  border-radius: 20px;
  color: #fff;
  font-size: 13px;
`

const LikeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

const LikeButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;

  background-color: rgba(0, 0, 0, 0.9);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.3);
  }
`

const LikeCount = styled.span`
  color: white;
  font-size: 14px;
  font-weight: 600;
`

function Post({ item }) {
  const navigate = useNavigate()

  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(item.likes)

  const handleNavigate = () => {
    navigate(`/photo/${item.id}`)
  }

  const handleLike = (e) => {
    e.stopPropagation()

    if (liked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }

    setLiked(!liked)
  }

  return (
    <Container onClick={handleNavigate}>
      <OverlayTop>
        <UserBox>
          <FiUser size={14} />
          @{item.user.username}
        </UserBox>

        <LikeWrapper>
          <LikeButton onClick={handleLike}>
            {liked ? (
              <FaHeart size={32} color="#ff2e63" />
            ) : (
              <FiHeart size={32} color="#ffffff" />
            )}
          </LikeButton>

          <LikeCount>{likes}</LikeCount>
        </LikeWrapper>
      </OverlayTop>

      <Image
        src={item.urls.small}
        alt={item.alt_description}
      />
    </Container>
  )
}

export default Post