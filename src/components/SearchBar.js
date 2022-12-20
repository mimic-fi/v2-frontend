import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ChainSelector from './ChainSelector'

function SearchBar({ value = '' }) {
  const [searchInput, setSearchInput] = useState(value)
  const navigate = useNavigate()

  const handleChange = e => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    navigate(`/smart-vaults/${searchInput}`)
  }

  return (
    <Search onSubmit={handleOnSubmit}>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
        required
      />
      <button>
        <ChainSelector />
      </button>
    </Search>
  )
}

const Search = styled.form`
  position: relative;
  width: 630px;
  border-radius: 4px;
  margin: 30px 0;
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  @media only screen and (max-width: 700px) {
    width: 90%;
  }

  input,
  button {
    height: 50px;
    border: 0;
    color: #2f2f2f;
    font-size: 20px;
    line-height: 32px;
  }
  input {
    outline: 0;
    width: 100%;
    background: #2b2d34;
    padding: 0 1.6rem;
    border-radius: 40px;
    appearance: none;
    transition: all 0.5s cubic-bezier(0, 0, 0.43, 1.49);
    transition-property: width, border-radius;
    z-index: 1;
    position: relative;
    color: white;
    ::placeholder {
      color: white;
      opacity: 1;
    }
  }
  button {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 90px;
    font-weight: bold;
    background: #2b2d34;
    border-radius: 0 40px 40px 0;
  }
  input:not(:placeholder-shown) {
    border-radius: 40px 0 0 40px;
    width: calc(100% - 90px);
    + button {
      display: block;
    }
  }
  label {
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    padding: 0;
    border: 0;
    height: 1px;
    width: 1px;
    overflow: hidden;
  }
`

export default SearchBar
