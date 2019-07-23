import React from 'react';
import axios from 'axios';
import { withRouter } from 'next/router';
import { default as NextLink } from 'next/link';
import styled from '@emotion/styled';
import { User } from '@voices-to-emotions/types';

import Layout from '../components/layout';
import Paragraph from '../components/paragraph';
import getPercentageColor from '../utils/percentage-color';
import SubHeading from '../components/sub-heading';

import '../utils/setup-axios';

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

let Labels = styled.div`
  display: flex;
  justify-content: space-between;
`;

let UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-right: 15px solid;
  font-size: 1.3rem;
  padding: 30px;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  border-right-color: ${({ children }) => getPercentageColor(children[1].props.children[0])};

  @media (max-width: 960px) {
    font-size: 1rem;
  }
`;

class Index extends React.Component<Props> {
  static async getInitialProps(): Promise<Props> {
    try {
      let users = await axios.get<Users>('/user');

      return { users: users.data.data };
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
        <SubHeading>Staff wellbeing tracker</SubHeading>

        <Paragraph>
          All employees are ranked in order of their likeliness-to-leave percentage, with the highest on top.
          <br />
          Click on an employee’s name to go to their personal page, which contains more detailed information.
        </Paragraph>

        <Labels>
          <span>Staff members name</span>
          <span>Likeliness to leave</span>
        </Labels>

        <div className="container-flex">
          {users
            .sort((a, b) => b.leavePercentage - a.leavePercentage)
            .map((user: User) => (
              <NextLink href={`/user?id=${user._id}`} key={user._id}>
                <Link>
                  <UserContainer>
                    <span>
                      {user.first_name} {user.last_name}
                    </span>
                    <div className="user-text deuxieme">{user.leavePercentage}%</div>
                  </UserContainer>
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
