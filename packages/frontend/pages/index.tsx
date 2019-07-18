import React from 'react';
import axios from 'axios';
import { withRouter } from 'next/router';
import { default as NextLink } from 'next/link';
import styled from '@emotion/styled';

import '../utils/setup-axios';
import Layout from '../components/layout';

export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  gender: string;
  birth_date: string;
  start_date: string;
  leavePercentage: number;
  team: {
    _id: string;
    name: string;
  };
};

export type Users = { data: Array<User>; type: string };

export type Props = {
  users?: Array<User>;
  error?: Error;
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

let Heading = styled.h2`
  font-weight: inherit;
  font-size: 2rem;
  line-height: 2rem;
  margin: 0;
  align-self: flex-end;
  margin-bottom: 20px;
`;

let Labels = styled.div`
  display: flex;
  justify-content: space-between;
`;

let User = styled.div`
  display: flex;
  justify-content: space-between;
  border-right: 15px solid;
  border-right-color: ${({ children }) => {
    let color = '#000000';
    let percentage = children[1].props.children[0];

    try {
      if (percentage < 45) {
        color = '#45a06f';
      } else if (percentage >= 45 && percentage <= 70) {
        color = '#feb069';
      } else {
        color = '#f44336';
      }
    } catch (e) {
      // do nothing...
    }

    return color;
  }};
  padding: 30px;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
`;

let UserBox = styled.div`
  font-size: 1.3rem;
`;

class Index extends React.Component<Props> {
  static async getInitialProps(): Promise<Props> {
    try {
      let users = await axios.get<Users>('/user');

      return {
        users: users.data.data.map(user => {
          return {
            ...user,
            leavePercentage: Math.random()
          };
        })
      };
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  render() {
    let { users, error }: Props = this.props;

    if (error) {
      return 'An error occured';
    }

    return (
      <Layout title="Overview">
        <Heading>Staff members</Heading>

        <Labels>
          <span>Staff members name</span>
          <span>Likeliness to leave</span>
        </Labels>

        <div className="container-flex">
          {users.sort((a, b) => (b.leavePercentage - a.leavePercentage)).map((user: User) => (
            <NextLink href={`/user?id=${user._id}`}>
              <Link>
                <User>
                  <UserBox>
                    {user.first_name} {user.last_name}
                  </UserBox>
                  <UserBox>{Math.round(user.leavePercentage * 10000) / 100} %</UserBox>
                </User>
              </Link>
            </NextLink>
          ))}
        </div>
      </Layout>
    );
  }
}

// @ts-ignore
export default withRouter(Index);
