import styled from 'styled-components'
import { FiInstagram, FiTwitter, FiGlobe } from 'react-icons/fi'

const Avatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 5px solid #0f0f0f;
`

const UserData = styled.div`
  margin-top: 20px;

  h1 {
    margin-bottom: 10px;
  }

  p {
    opacity: 0.7;
  }
`

const SocialLinks = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 15px;

  a {
    color: white;
    font-size: 20px;
    transition: 0.3s;

    &:hover {
      color: #007bff;
      transform: scale(1.2);
    }
  }
`

const Stats = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 20px;

  span {
    font-weight: bold;
  }
`

export default function ProfileDetails({ user }) {
  return (
    <>
      <Avatar src={user.profile_image.large} />

      <UserData>
        <h1>{user.name}</h1>
        <p>@{user.username}</p>
        <p>{user.bio}</p>

        <SocialLinks>
          {user.instagram_username && (
            <a
              href={`https://instagram.com/${user.instagram_username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInstagram />
            </a>
          )}

          {user.twitter_username && (
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiTwitter />
            </a>
          )}

          {user.portfolio_url && (
            <a href={user.portfolio_url} target="_blank" rel="noopener noreferrer">
              <FiGlobe />
            </a>
          )}
        </SocialLinks>

        <Stats>
          <div><span>{user.total_photos}</span> Fotos</div>
          <div><span>{user.total_likes}</span> Likes</div>
        </Stats>
      </UserData>
    </>
  )
}
