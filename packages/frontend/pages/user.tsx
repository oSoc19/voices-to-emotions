import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'next/router';
import { default as NextLink } from 'next/link';
import styled from '@emotion/styled';

import UserHeader from '../components/user-header';
import UserGraphs from '../components/user-graphs';
import LeaveCard from '../components/leave-card';
import Layout from '../components/layout';
import Button from '../components/button';
import BackButton from '../components/back-button';

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
    leavePercentage: number;
  };
  error?: Error;
};

export type State = {
  graph: Array<GraphItem>;
  error?: Error;
  refreshing: boolean;
  leavePercentage: number;
};

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-gap: 20px;
`;

class Index extends React.Component<Props, State> {
  static async getInitialProps(req): Promise<Props> {
    try {
      if (req.query && req.query.id) {
        let user = await axios.get(`/user?user_id=${req.query.id}`);

        return { user: user.data.data };
      } else {
        throw new Error('No query parameter!');
      }
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      graph: [],
      leavePercentage: 0,
      refreshing: false
    };

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  async refresh() {
    await new Promise(resolve => setTimeout(resolve, 1));
    if (this.state.refreshing) return;

    try {
      this.setState({
        refreshing: true
      });

      let graph = await axios.get(`/graphs?user_id=${this.props.user._id}`);
      let leavePercentage = await axios.get(`/leave?user_id=${this.props.user._id}`);

      this.setState({
        graph: graph.data.data,
        leavePercentage: leavePercentage.data.data,
        error: undefined,
        refreshing: false
      });
    } catch (e) {
      this.setState({
        error: e,
        refreshing: false
      });
    }
  }

  render() {
    let { user, error }: Props = this.props;

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
        <BackButton href="/">Overview</BackButton>
        <UserHeader
          user={{
            ...user,
            birth_date: moment(user.birth_date),
            start_date: moment(user.start_date)
          }}
          leavePercentage={this.state.leavePercentage}
        />
        <ButtonContainer>
          <div />
          <Button
            onClick={this.refresh}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                this.refresh();
              }
            }}
          >
            {this.state.refreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <NextLink href={`/upload?user_id=${user._id}`}>
            <Button primary>Upload</Button>
          </NextLink>
        </ButtonContainer>
        <LeaveCard leavePercentage={this.state.leavePercentage} user={user} />
        <UserGraphs graph={this.state.graph} />
      </Layout>
    );
  }
}

// @ts-ignore
export default withRouter(Index);
