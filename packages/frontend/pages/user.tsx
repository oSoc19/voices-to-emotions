import React from 'react';
import moment, { Moment } from 'moment';
import { withRouter } from 'next/router';
import styled from '@emotion/styled';

import Layout from '../components/layout';

import '../utils/setup-axios';

export type User = {
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: Moment;
  picture: string;
  hiredDate: Moment;
};

export type Props = {
  user?: User;
  error?: Error;
};

const GENDER_ENUMS = {
  M: 'Male',
  F: 'Female',
  X: 'Gender X'
};

let UserHeader = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 140px 1fr auto;
  grid-template-areas: 'avatar heading satisfaction';
  grid-gap: 20px 50px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #2e2e30;
`;

let Avatar = styled.img`
  grid-area: avatar;
  max-height: 100%;
  width: 100%;
  border-radius: 100%;
`;

let SubHeading = styled.h2`
  font-weight: inherit;
  font-size: 2rem;
  line-height: 2rem;
  margin: 0;
  align-self: flex-end;
  margin-bottom: 20px;
`;

let UserInfo = styled.h3`
  font-size: 1.2rem;
  align-self: flex-start;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 20px;
  font-weight: inherit;
  margin: 0;
`;

let SatisfactionPercentage = styled.div`
  font-size: 5rem;
  text-align: right;
  color: ${({ children }) => {
    let color = '#000000';
    if (typeof children === 'string') {
      try {
        let percentage = parseInt(children.replace('%', '').trim(), 10);
        if (percentage > 50) {
          color = '#45a06f';
        } else {
          color = '#f44336';
        }
      } catch (e) {
        // do nothing...
      }
    }

    return color;
  }};
`;

const msToYears = (ms: number): number => {
  return Math.round(ms / 1000 / 60 / 60 / 24 / 365);
};

const getGenderString = (g: string): string => {
  let found = GENDER_ENUMS[g];
  if (found) {
    return found;
  }

  return 'Unknown Gender';
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
        birthdate: moment('06/05/1965'),
        picture: '/static/user-pictures/1.png',
        hiredDate: moment('08/03/2016')
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

    let fullName = `${user.firstName} ${user.lastName}`;
    let currDate = moment();
    let formattedHiredDate = moment(user.hiredDate).format('DD MMMM YYYY');

    return (
      <Layout title="User">
        <UserHeader>
          <Avatar src={user.picture} title={fullName} alt={fullName} />
          <div style={{ gridArea: 'heading' }}>
            <SubHeading>
              {fullName} ({msToYears(currDate.diff(user.birthdate))})
            </SubHeading>
            <UserInfo>
              <div>{getGenderString(user.gender)}</div>
              <div>Hired on {formattedHiredDate}</div>
            </UserInfo>
          </div>
          <div style={{ gridArea: 'satisfaction' }}>
            <SubHeading style={{ textAlign: 'right' }}>Satisfaction</SubHeading>
            <SatisfactionPercentage>90%</SatisfactionPercentage>
          </div>
        </UserHeader>
      </Layout>
    );
  }
}

// @ts-ignore
export default withRouter(Index);
