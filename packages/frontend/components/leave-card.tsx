import React from 'react';
import styled from '@emotion/styled';

import SubHeading from '../components/sub-heading';
import Paragraph from '../components/paragraph';
import getPercentageColor from '../utils/percentage-color';

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

  let percentageStyle = {
    color: getPercentageColor(leavePercentage),
    fontSize: '3rem'
  };

  return (
    <Card>
      <SubHeading style={percentageStyle}>{Math.round(leavePercentage)} %</SubHeading>
      <Paragraph>
        This page displays the profile of {user.first_name}. The percentage on the right indicates how likely an
        employee is to quit. Click on it to show the calculation.
      </Paragraph>
    </Card>
  );
}
