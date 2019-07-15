import React from 'react';
import moment from 'moment';
import styled from '@emotion/styled';

import { User } from '../types/user';

export type Props = {
  user: User;
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
        if (percentage < 50) {
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

const GENDER_ENUMS: { [key: string]: string } = {
  M: 'Male',
  F: 'Female',
  X: 'Gender X'
};

const getGenderString = (g: string): string => {
  let found = GENDER_ENUMS[g];
  if (found) {
    return found;
  }

  return 'Unknown Gender';
};

export default function(props: Props) {
  let { user } = props;

  let fullName = `${user.firstName} ${user.lastName}`;
  let currDate = moment();
  let formattedHiredDate = moment(user.hiredDate).format('DD MMMM YYYY');

  return (
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
        <SubHeading style={{ textAlign: 'right' }}>Likeliness to quit</SubHeading>
        <SatisfactionPercentage>90%</SatisfactionPercentage>
      </div>
    </UserHeader>
  );
}
