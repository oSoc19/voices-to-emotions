import * as React from 'react';
import styled from '@emotion/styled';
import { default as NextLink } from 'next/link';

import Head from './head';

export type Props = {
  title: string;
  children: React.ReactNode;
};

let Main = styled.main`
  padding: 50px;
  box-sizing: border-box;
  max-width: 960px;
  margin: 0 auto 50px auto;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border-bottom: solid 5px #009de9;

  @media (max-width: 960px) {
    border: none;
    box-shadow: none;
  }
`;

let ColorStripContainer = styled.div`
  border-top: solid 12px #009de9;
`;

let BottomBorder = styled.div`
  background-image: url('/static/bottom_border.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 12px;
  width: 100%;
  bottom: 0;
  position: fixed;
`;

let Logo = styled.div`
  background-image: url('/static/engie-logo.svg');
  background-repeat: no-repeat;
  background-size: auto;
  width: 150px;
  height: 50px;
  margin: 50px auto;
  cursor: pointer;
`;

export default function Layout({ title, children }: Props) {
  return (
    <React.Fragment>
      <ColorStripContainer>
        <Head title={title} />
        <NextLink href={'/'}>
          <Logo />
        </NextLink>
        <Main>{children}</Main>
        <BottomBorder />
      </ColorStripContainer>
    </React.Fragment>
  );
}
