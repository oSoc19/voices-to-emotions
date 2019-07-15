import React from 'react';
import moment from 'moment';
import { withRouter } from 'next/router';

import UserHeader from '../components/user-header';
import { UserAPIResponse } from '../types/user';
import Layout from '../components/layout';

import '../utils/setup-axios';

export type Props = {
  user?: UserAPIResponse;
  error?: Error;
};

class Index extends React.Component<Props> {
  static async getInitialProps(): Promise<Props> {
    try {
      // let user = await axios.get('/user');
      // return { user: user.data };

      let dummyUser = {
        firstName: 'Johny',
        lastName: 'Dope',
        gender: 'X',
        birthdate: moment('06/05/1965').toString(),
        picture: '/static/user-pictures/1.png',
        hiredDate: moment('08/03/2016').toString()
      };

      return { user: dummyUser };
    } catch (e) {
      console.error(e);
      return { error: e };
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
        <UserHeader
          user={{
            ...user,
            birthdate: moment(user.birthdate),
            hiredDate: moment(user.hiredDate)
          }}
        />
      </Layout>
    );
  }
}

// @ts-ignore
export default withRouter(Index);
