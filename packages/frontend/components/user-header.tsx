import React from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import { User } from '@voices-to-emotions/types';

import getGenderString from '../utils/gender-string';
import { msToYears } from '../utils/time';

export type Props = {
  user: User;
  leavePercentage: number;
};

let UserHeader = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'avatar name';
  grid-gap: 20px 50px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #2e2e30;

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'name';
  }
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

  @media (max-width: 450px) {
    display: none;
  }
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
