import * as React from 'react';
import styled from '@emotion/styled';

import Head from './head';

export type Props = {
  title: string;
  children: React.ReactNode;
};

let Main = styled.main`
  padding: 50px;
  box-sizing: border-box;
  max-width: 960px;
  margin: 50px auto;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
`;

export default function Layout({ title, children }: Props) {
  return (
    <React.Fragment>
      <Head title={title} />

      <Main>{children}</Main>
    </React.Fragment>
  );
}