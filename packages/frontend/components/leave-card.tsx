import React from 'react';
import styled from '@emotion/styled';

import SubHeading from '../components/sub-heading';
import Paragraph from '../components/paragraph';

const Card = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export type Props = {
  leavePercentage: number;
  user: any;
};

export default function(props: Props) {
  let { leavePercentage, user } = props;

  let percentageColor = '#45a06f';
  if (leavePercentage < 45) {
    percentageColor = '#45a06f';
  } else if (leavePercentage >= 45 && leavePercentage <= 65) {
    percentageColor = '#feb069';
  } else {
    percentageColor = '#f44336';
  }

  return (
    <Card>
      <SubHeading style={{ color: percentageColor, fontSize: '3rem' }}>{Math.round(leavePercentage)} %</SubHeading>
      <Paragraph>
        This page displays the profile of {user.first_name}. The percentage on the right indicates how likely an
        employee is to quit. Click on it to show the calculation.
      </Paragraph>
    </Card>
  );
}
