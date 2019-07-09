import React from 'react';
import axios from 'axios';
import { withRouter } from 'next/router';

import '../utils/setup-axios';

export type Props = {
  pong: null | {
    data: string;
    message: string;
  };
  error?: Error;
};

class Index extends React.Component<Props> {
  static async getInitialProps(): Promise<Props> {
    try {
      let pong = await axios.get('/ping');

      return { pong: pong.data };
    } catch (e) {
      console.error(e);
      return { pong: null, error: e };
    }
  }

  render() {
    let { pong, error }: Props = this.props;

    if (error) {
      return 'An error occured';
    }

    return <div>{JSON.stringify(pong)}</div>;
  }
}

// @ts-ignore
export default withRouter(Index);
