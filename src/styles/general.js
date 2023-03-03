import styled from 'styled-components'

export const Loading = styled.div`
  height: 70vh;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Skeleton = styled.div`
  display: block;
  height: ${props => (props.height ? props.height : '30px')};
  width: ${props => (props.width ? props.width : '400px')};
  max-width: 100%;
  ${props =>
    props.marginBottom &&
    'margin-bottom: ' + props.marginBottom + ';'} border-radius: 8px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, transparent 50%, #212327);

  &::after {
    animation: shimmer 2s infinite;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      270deg,
      transparent 0%,
      #4d427d 50%,
      rgba(34, 29, 60, 0.05) 100%
    );
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`
