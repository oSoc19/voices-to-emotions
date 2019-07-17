import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'next/router';

import UserHeader from '../components/user-header';
import UserGraphs from '../components/user-graphs';
import Layout from '../components/layout';

import '../utils/setup-axios';

type GraphItem = {
  angry: number;
  calm: number;
  disgust: number;
  fearful: number;
  happy: number;
  neutral: number;
  sad: number;
  surprised: number;
  feedback: number;
  duration: number;
};

export type Props = {
  user?: {
    _id: string;
    first_name: string;
    last_name: string;
    gender: string;
    birth_date: string;
    start_date: string;
    team: string;
    avatar: string;
  };
  graph?: Array<GraphItem>;
  leavePercentage?: number;
  error?: Error;
};

class Index extends React.Component<Props> {
  static async getInitialProps(req): Promise<Props> {
    try {
      if (req.query && req.query.id) {
        let user = await axios.get(`/user?user_id=${req.query.id}`);
        let graph = await axios.get(`/graphs?user_id=${req.query.id}`);
        let leavePercentage = await axios.get(`/leave?user_id=${req.query.id}`);

        return { user: user.data.data, graph: graph.data.data, leavePercentage: leavePercentage.data.data };
      } else {
        throw new Error('No query parameter!');
      }
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  render() {
    let { user, error, graph, leavePercentage }: Props = this.props;

    if (error) {
      // TODO: Render a proper error page
      return 'An error occured';
    }

    if (!user) {
      // TODO: Render a 404
      return '404: User Not Found';
    }

    return (
      <Layout title="User">
        <UserHeader
          user={{
            ...user,
            birth_date: moment(user.birth_date),
            start_date: moment(user.start_date)
          }}
          leavePercentage={leavePercentage}
        />
        <UserGraphs graph={graph} />
      </Layout>
    );
  }
}

// @ts-ignore
export default withRouter(Index);
