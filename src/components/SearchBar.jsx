import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'

const SearchContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  justify-content: center;
  background: #0f0f0f;
  z-index: 100;
  border-bottom: 1px solid #222;
`

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
`

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #999;
  font-size: 18px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 15px 12px 45px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  transition: all 0.3s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    background: #222;
  }
`

export default function SearchBar({ onSearch }) {
  return (
    <SearchContainer>
      <SearchInputWrapper>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Pesquisar usuários, ambientes, descrição..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </SearchInputWrapper>
    </SearchContainer>
  )
}
