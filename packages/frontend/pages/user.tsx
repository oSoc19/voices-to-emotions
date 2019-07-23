import React from 'react';
import axios from 'axios';
import { withRouter } from 'next/router';
import { default as NextLink } from 'next/link';
import styled from '@emotion/styled';
import { User, GraphEntry } from '@voices-to-emotions/types';

import UserHeader from '../components/user-header';
import UserGraphs from '../components/user-graphs';
import LeaveCard from '../components/leave-card';
import Layout from '../components/layout';
import Button from '../components/button';
import BackButton from '../components/back-button';
import Paragraph from '../components/paragraph';

import '../utils/setup-axios';

export type Props = {
  user?: User;
  error?: Error;
};

export type State = {
  graph: Array<GraphEntry>;
  error?: Error;
  refreshing: boolean;
  leavePercentage: number;
  refreshInterval?: number;
};

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  grid-gap: 20px;

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
    grid-gap: 5px;
    margin-bottom: 20px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
      refreshing: false,
      refreshInterval: null
    };

    this.refresh = this.refresh.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.refresh();

  }

  componentWillUnmount() {
    if (this.state.refreshInterval) {
      window.clearInterval(this.state.refreshInterval);
    }
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

  async reset() {
    await axios.get(`/reset?user_id=${this.props.user._id}`);
    this.refresh();
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
        <TopContainer>
          <BackButton href="/">Overview</BackButton>
          {this.state.leavePercentage > 65 && <img src={"/static/urgent_label.svg"} height={"70px"}/>}
        </TopContainer>
        <UserHeader user={user} leavePercentage={this.state.leavePercentage} />
        <ButtonContainer>
          <div />
          <Button onClick={this.reset}>Reset Data</Button>
          <Button
            onClick={this.refresh}
            disabled={!!this.state.refreshing}
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
        <Paragraph>
          The graphs below give information on different predictors of the likeliness-to-leave. Hover over the graphs to
          see the values per call.
        </Paragraph>
        <UserGraphs graph={this.state.graph} />
      </Layout>
    );
  }
}

// @ts-ignore
export default withRouter(Index);
