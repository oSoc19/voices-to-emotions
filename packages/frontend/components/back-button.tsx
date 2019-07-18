import { default as NextLink } from 'next/link';
import styled from '@emotion/styled';

export type Props = {
  href: string;
  children: string;
};

const BackButtonStyled = styled.button`
  padding: 10px 10px 10px 0;
  border: none;
  box-shadow: none;
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BackIcon = styled.div`
  height: 1rem;
  width: 1.5rem;
  background: url('/static/back_arrow.svg') no-repeat;
`;

export default function BackButton(props: Props) {
  return (
    <NextLink href={props.href}>
      <BackButtonStyled>
        <BackIcon /> {props.children}
      </BackButtonStyled>
    </NextLink>
  );
}
