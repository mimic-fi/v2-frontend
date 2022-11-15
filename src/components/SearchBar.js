import React, { useState, useCallback } from 'react'
import { useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import search from '../assets/search.svg'

function SearchBar() {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    e.preventDefault()
    console.log('change', searchInput)
    setSearchInput(e.target.value)
    console.log('change after', searchInput)
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    console.log('change', searchInput, e)
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
      <button type="submit">
        <img src={search} alt="" />
      </button>
    </Search>
  )
}

const Search = styled.form`
  position: relative;
  width: 30rem;
  background: #a996ff;
  border-radius: 4px;
  margin: 30px 0;
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;

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
    background: #fff;
    padding: 0 1.6rem;
    border-radius: 4px;
    appearance: none;
    transition: all 0.5s cubic-bezier(0, 0, 0.43, 1.49);
    transition-property: width, border-radius;
    z-index: 1;
    position: relative;
  }
  button {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    font-weight: bold;
    background: #a996ff;
    border-radius: 0 4px 4px 0;
  }
  input:not(:placeholder-shown) {
    border-radius: 4px 0 0 4px;
    width: calc(100% - 70px);
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
