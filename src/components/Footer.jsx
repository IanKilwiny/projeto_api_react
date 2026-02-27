import styled from 'styled-components'

const FooterContainer = styled.footer`
  background: #111;
  border-top: 1px solid #222;
  padding: 40px 20px;
  text-align: center;
  margin-top: 80px;
  color: #ccc;
  font-size: 14px;
`

export default function Footer() {
  return (
    <FooterContainer>
      <p>PWEB2 - Ian e João Vitor</p>
    </FooterContainer>
  )
}
