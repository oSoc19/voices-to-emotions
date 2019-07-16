import React from 'react';
import axios from 'axios';
import { withRouter, useRequest } from 'next/router';
import Link from 'next/link';
import Head from '../components/head';
import '../utils/setup-axios';

export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  gender: string;
  birth_date: string;
  start_date: string;
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
      <div className="box">
        <div className="container-grid">
          <Head title="Overview" />

          <header className="title">Staff members</header>

          <span className="column-name">Staff members name</span>
          <span className="column-name second">Likeliness to leave</span>

          <div className="container-flex">
            {users.map((user: User) => (
              <Link href={`/user?id=${user._id}`}>
                <div className="item-flex subcontainer-grid">
                  <div className="user-text">
                    {user.first_name} {user.last_name}
                  </div>
                  <div className="user-text deuxieme">57%</div>
                  <div className="color" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// @ts-ignore
export default withRouter(Index);
