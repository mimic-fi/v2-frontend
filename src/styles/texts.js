import styled from 'styled-components'

export const H1 = styled.h1`
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  font-size: 72px;
  line-height: 81px;
  letter-spacing: 1px;
  color: #fcfcfc;
  margin: 30px auto;
  max-width: 90vw;
  @media only screen and (max-width: 700px) {
    font-size: 40px;
    line-height: 52px;
  }
  @media only screen and (min-width: 1440px) {
    font-size: 80px;
    line-height: 90px;
  }
`

export const Hxl = styled.h2`
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  font-size: 124px;
  line-height: 139px;
  letter-spacing: 1.71671px;
  color: #fcfcfc;
  margin: 0;

  @media only screen and (max-width: 700px) {
    font-size: 70px;
    line-height: 80px;
  }
  @media only screen and (min-width: 1440px) {
    font-size: 138px;
    line-height: 155px;
  }
`

export const H2 = styled.h2`
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  font-size: 50px;
  line-height: 64px;
  letter-spacing: 1px;
  color: #fcfcfc;
  margin: 30px auto;
  max-width: 90vw;

  @media only screen and (max-width: 700px) {
    font-size: 28px;
    line-height: 40px;
  }
  @media only screen and (min-width: 1440px) {
    font-size: 56px;
    line-height: 72px;
  }
`

export const H3 = styled.h3`
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  font-size: 43px;
  line-height: 50px;
  letter-spacing: 1px;
  color: #fcfcfc;
  margin: 0;

  @media only screen and (max-width: 700px) {
    font-size: 36px;
    line-height: 48px;
  }
  @media only screen and (min-width: 1440px) {
    font-size: 48px;
    line-height: 56px;
  }
`

export const H5 = styled.h5`
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 43px;
  letter-spacing: 1px;
  color: #fcfcfc;
  margin: 0;

  @media only screen and (min-width: 1440px) {
    font-size: 36px;
    line-height: 48px;
  }
`

export const H6 = styled.h6`
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  font-size: 21px;
  line-height: 28px;
  letter-spacing: 1px;
  color: #fcfcfc;
  margin: 0;

  @media only screen and (max-width: 700px) {
    font-size: 20px;
    line-height: 32px;
  }
  @media only screen and (min-width: 1440px) {
    font-size: 24px;
    line-height: 32px;
  }
`

export const BodyL = styled.p`
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.75px;
  color: #fcfcfc;
  @media only screen and (max-width: 700px) {
    font-size: 17px;
    line-height: 28px;
  }
  @media only screen and (min-width: 1440px) {
    font-size: 20px;
    line-height: 32px;
  }
`

export const BodyM = styled.p`
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: 0.75px;
  color: #fcfcfc;

  @media only screen and (min-width: 1440px) {
    font-size: 18px;
    line-height: 32px;
  }
`

export const BodyS = styled.p`
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 21px;
  letter-spacing: 0.75px;
  color: #fcfcfc;

  @media only screen and (min-width: 1440px) {
    font-size: 15px;
    line-height: 24px;
  }
`

export const LinkS = styled.a`
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 21px;
  letter-spacing: 0.75px;
  color: #fcfcfc;
  cursor: pointer;
  text-decoration: none;

  @media only screen and (min-width: 1440px) {
    font-size: 15px;
    line-height: 24px;
  }
`
export const LinkL = styled.a`
  font-family: 'GTWalsheimProBold';
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.75px;
  color: #fcfcfc;
  cursor: pointer;
  text-decoration: none;

  @media only screen and (max-width: 700px) {
    font-size: 17px;
    line-height: 28px;
  }
  @media only screen and (min-width: 1440px) {
    font-size: 20px;
    line-height: 32px;
  }
`

export const Button = styled.a`
  display: inline-block;
  width: auto;
  padding: 22px 30px;
  background: #8505b1;
  border-radius: 4px;
  font-family: 'GTWalsheimProBold';
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  text-align: center;
  color: #ffffff;
  &:hover {
    background: #4d0367;
  }
`
export const BoldL = styled.p`
  font-family: 'GTWalsheimProBold';
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
  letter-spacing: 0.75px;
  color: #fcfcfc;
`

export const Container = styled.div`
  margin: auto;
  max-width: 1140px;
  @media only screen and (min-width: 701px) and (max-width: 1200px) {
    max-width: 90%;
  }
  @media only screen and (min-width: 1900px) {
    margin: auto;
  }
  @media only screen and (max-width: 700px) {
    margin: 0 24px;
    padding 24px 0;
  }

`
