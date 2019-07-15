import React from 'react';
import axios from 'axios';
import { withRouter, useRequest } from 'next/router';
import Link from 'next/link';
import Head from '../components/head'
import '../utils/setup-axios';

export type User = {
  name: string;
  birth: Date;
  hiredOn: Date;
  likelinessToLeave: Number;
}

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
    data = [{
      name: "John",
      birth: new Date(),
      hiredOn: new Date(),
      likelinessToLeave: 100
    },
    {
      name: "Smith",
      birth: new Date(),
      hiredOn: new Date(),
      likelinessToLeave: 100
    }];

    return <div className="box">

      <div className="container-grid">

        <Head title="Overview"></Head>

        <header className="title">
          Staff members
        </header>

        <span className="column-name">Staff members name</span>
        <span className="column-name second">Likeliness to leave</span>

        <div className="container-flex" >
          {data.map((user) =>
            <Link href="/user">
              <div className="item-flex subcontainer-grid">
                <div className="user-text">{user.name}</div>
                <div className="user-text deuxieme">{user.likelinessToLeave}</div>
                <div className="color"></div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>;
  }
}

// @ts-ignore
export default withRouter(Index);
