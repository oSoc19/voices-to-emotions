import React from 'react';
import axios from 'axios';
import { withRouter, useRequest } from 'next/router';
import Link from 'next/link';

import '../utils/setup-axios';

export type User = {
  name: string;
  birth: Date;
  hiredOn: Date;
  likelinessToLeave: Number;
};

export type Users = Array<User>;

export type Props = {
  data?: Users;
  error?: Error;
};

class Index extends React.Component<Props> {
  static async getInitialProps(): Promise<Props> {
    try {
      let users = await axios.get<Users>('/ping');

      return { data: users.data };
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  render() {
    let { data, error }: Props = this.props;

    if (error) {
      return 'An error occured';
    }
    // temporary data
    data = [
      {
        name: 'John',
        birth: new Date(),
        hiredOn: new Date(),
        likelinessToLeave: 100
      },
      {
        name: 'Smith',
        birth: new Date(),
        hiredOn: new Date(),
        likelinessToLeave: 100
      }
    ];

    return (
      <div>
        <header>
          <h1>Staff members</h1>
        </header>
        <div>
          <ul className="container">
            {data.map(user => (
              <Link href="/user">
                <li className="item">{user.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

// @ts-ignore
export default withRouter(Index);
