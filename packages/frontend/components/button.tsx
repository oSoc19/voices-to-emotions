import styled from '@emotion/styled';

export type Props = {
  primary?: boolean;
};

export default styled.button<Props>`
  background-color: ${props => (props.primary ? '#019de9' : '#FFFFFF')};
  border: none;
  color: ${props => (props.primary ? '#FFFFFF' : '#000000')};
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid;
  border-color: ${props => (props.primary ? 'transparent' : '#019de9')};

  &:hover {
    color: #ffffff;
    background-color: ${props => (props.primary ? '#0074ac' : '#019de9')};
  }
`;
