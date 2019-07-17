import React from 'react';
import moment from 'moment';
import { withRouter } from 'next/router';

import UserHeader from '../components/user-header';
import UserGraphs from '../components/user-graphs';
import Layout from '../components/layout';

import '../utils/setup-axios';
import styled from '@emotion/styled';

export type Props = {
  userId: string;
};

class Index extends React.Component<Props> {
  static async getInitialProps(req): Promise<Props> {
    return { userId: req.query.user_id };
  }

  render() {
    let { userId }: Props = this.props;

    return (
      <Layout title="User">
        <div>user id: {userId}</div>
      </Layout>
    );
  }
}

// @ts-ignore
export default withRouter(Index);
