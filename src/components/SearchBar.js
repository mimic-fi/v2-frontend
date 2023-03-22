import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ChainSelector from './ChainSelector'

function SearchBar({ value = '' }) {
  const [searchInput, setSearchInput] = useState(value)
  const navigate = useNavigate()
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700

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

      {width >= medium ? (
        <>
          <Chain>
            <ChainSelector />
          </Chain>
          <input type="submit" hidden />
        </>
      ) : (
        <Submit type="submit">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20M20 12L14 6M20 12L14 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Submit>
      )}
    </Search>
  )
}

const Submit = styled.button`
  background: ${props => props.theme.main}!important;
  color: white !important;
  width: 72px !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
`

const Chain = styled.div`
  background: #2b2d34;
  border-radius: 0 40px 40px 0;
`
const Search = styled.form`
  position: relative;
  display: flex;
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
    @media only screen and (max-width: 700px) {
      width: calc(100% - 67px);
    }
    background: #2b2d34;
    padding: 0 1.6rem;
    border-radius: 40px 0 0 40px;
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
    width: calc(100% - 87px);
    @media only screen and (max-width: 700px) {
      width: calc(100% - 67px);
    }
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
