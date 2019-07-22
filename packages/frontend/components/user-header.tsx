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
  leavePercentage: number;
};

let UserHeader = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'avatar name information';
  grid-gap: 20px 50px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #2e2e30;
`;

let Avatar = styled.div`
  width: 125px;
  height: 125px;
  border-radius: 5px;
  background: #019de9;
  font-size: 62.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;

let Name = styled.div`
  display: grid;
  font-size: 2rem;
  grid-gap: 10px;
`;

let UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
`;

let Age = styled.div`
  font-size: 1.25rem;
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

  let currDate = moment();
  let formattedHiredDate = moment(user.start_date).format('DD/MM/YYYY');

  return (
    <UserHeader>
      <Avatar>
        {user.first_name[0]}
        {user.last_name[0]}
      </Avatar>
      <UserInfo>
        <div style={{ gridArea: 'name' }}>
          <Name>
            <span>
              {user.first_name} {user.last_name}
            </span>
          </Name>
        </div>
        <Age>{msToYears(currDate.diff(user.birth_date))}</Age>
        <div>{getGenderString(user.gender)}</div>
        <div>Hired on {formattedHiredDate}</div>
      </UserInfo>
    </UserHeader>
  );
}
