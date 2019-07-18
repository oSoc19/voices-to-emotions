import React from 'react';
import moment, { Moment } from 'moment';
import styled from '@emotion/styled';

export type Props = {
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    gender: string;
    birth_date: Moment;
    start_date: Moment;
    team: string;
    avatar: string;
    leavePercentage: number;
  };
};

let UserHeader = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 150px 1fr auto;
  grid-template-areas: 'avatar heading satisfaction';
  grid-gap: 20px 50px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #2e2e30;
`;

let Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  background: #019de9;
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
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
    let color = '#ffffff';
    let percentage = children[0];

    try {
      if (percentage <= 40) {
        color = '#45a06f';
      } else if (percentage >= 40 && percentage <= 60) {
        color = '#fb881d';
      } else {
        color = '#f44336';
      }
    } catch (e) {
      // do nothing...
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

  let fullName = `${user.first_name} ${user.last_name}`;
  let currDate = moment();
  let formattedHiredDate = moment(user.start_date).format('DD MMMM YYYY');

  return (
    <UserHeader>
      <Avatar>
        {user.first_name[0]}
        {user.last_name[0]}
      </Avatar>
      <div style={{ gridArea: 'heading' }}>
        <SubHeading>
          {fullName} ({msToYears(currDate.diff(user.birth_date))})
        </SubHeading>
        <UserInfo>
          <div>{getGenderString(user.gender)}</div>
          <div>Hired on {formattedHiredDate}</div>
        </UserInfo>
      </div>
      <div style={{ gridArea: 'satisfaction' }}>
        <SubHeading style={{ textAlign: 'right' }}>Likeliness to quit</SubHeading>
        <SatisfactionPercentage>{Math.round(user.leavePercentage * 10000) / 100} %</SatisfactionPercentage>
      </div>
    </UserHeader>
  );
}
