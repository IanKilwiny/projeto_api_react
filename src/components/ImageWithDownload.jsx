import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: block;
  max-width: 100%;

  img {
    width: 100%;
    border-radius: 12px;
    display: block;
  }

  .controls {
    position: absolute;
    right: 12px;
    bottom: 12px;
    display: flex;
    gap: 8px;
  }

  .btn {
    background: rgba(0,0,0,0.6);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    text-decoration: none;
  }
`

function ImageWithDownload({ src, downloadLink, alt = '' }) {
  const [loading, setLoading] = useState(true)

  return (
    <Wrapper>
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        style={{ opacity: loading ? 0.6 : 1 }} // Deixa a imagem um pouco transparente enquanto carrega, para indicar que está em processo de carregamento
      />

      <div className="controls">
        <a
          className="btn"
          href={downloadLink}
          target="_blank"
          rel="noopener noreferrer"
          download // Atributo que sugere ao navegador que o link é para downloadlher outro nome ou pasta.
        >
          Baixar
        </a>
      </div>
    </Wrapper>
  )
}

export default ImageWithDownload
