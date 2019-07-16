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
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
`;

let ColorStrip = styled.div`
  border-top: solid 12px #04afee;
`;

export default function Layout({ title, children }: Props) {
  return (
    <React.Fragment>
      <ColorStrip>
        <Head title={title} />

        <Main>{children}</Main>
      </ColorStrip>
    </React.Fragment>
  );
}
