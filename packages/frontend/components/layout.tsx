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
  margin: 0 auto 40px auto;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  overflow: hidden;

  @media (max-width: 960px) {
    border: none;
    box-shadow: none;
    padding: 10px;
  }
`;

let ColorStripContainer = styled.div`
  border-top: solid 12px #009de9;
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

let Footer = styled.footer`
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

let Link = styled.a`
  color: #009de9;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
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
      </ColorStripContainer>

      <Footer>
        Open Knowledge © 2019 -{' '}
        <Link href="https://osoc19.github.io/voices-to-emotions/">Read More about this project</Link>
      </Footer>
    </React.Fragment>
  );
}
