import * as React from 'react';
import Head from 'next/head';

import { SITE_NAME } from '../utils/constants';
import '../styles/global.css';

export type Props = {
  title: string;
};

export default function Head({ title }: Props) {
  <Head>
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
    <title>
      {SITE_NAME} | {title}
    </title>
  </Head>;
}