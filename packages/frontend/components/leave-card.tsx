import React from 'react';
import styled from '@emotion/styled';

import SubHeading from '../components/sub-heading';
import Paragraph from '../components/paragraph';
import getPercentageColor from '../utils/percentage-color';

const Card = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const GreetingContainer = styled.div`
  margin-bottom: 20px;
`;

const UL = styled.ul`
  margin: 0 0 0 20px;
  padding: 0;
`;

const LI = styled.li`
  margin: 0 0 10px 0;
  padding: 0;
`;

export type Props = {
  leavePercentage: number;
  user: any;
};

export type GreetingProps = {
  likeliness: number;
};

function Greeting(props: GreetingProps) {
  const likeliness = props.likeliness;

  if (likeliness < 45) {
    return (
      <GreetingContainer>
        <Paragraph style={{ marginBottom: 20 }}>Suggestions</Paragraph>
        <UL>
          <LI>
            Schedule quarterly evaluations, instead of annual. This avoids frustrations to build up over time. When an
            employee is heard, they feel validated, which in turn leads to higher performance.
          </LI>
          <LI>
            Organise remain-calls, instead of only exit-calls. Ask the employee what motivates them to stay in the
            company, and what it would take for them to leave. This uncoves issues before they become bigger problems,
            and allows for a focused strategy to support the employee.
          </LI>
        </UL>
      </GreetingContainer>
    );
  } else if (likeliness < 65) {
    return (
      <GreetingContainer>
        <Paragraph style={{ marginBottom: 20 }}>Suggestions</Paragraph>
        <UL>
          <LI>
            This employee might feel like their accomplishments are not recognized. Inspect their performance and reward
            when due. A reward can be a simple e-mail, card, or note to thank them for their effort.
          </LI>
          <LI>
            Problems with work-life balance contribute to decreases in motivation and performance. Check in with the
            employee by sending an e-mail to ask how they are. Suggest them to take a day off if they can.
          </LI>
        </UL>
      </GreetingContainer>
    );
  }

  return (
    <GreetingContainer>
      <Paragraph style={{ marginBottom: 20 }}>Suggestions</Paragraph>
      <UL>
        <LI>
          Immediate follow-up is required, make sure to handle this personally and discretely. Invite them for a
          conversation to clarify that the company cares about their well-being, and values them.{' '}
        </LI>
        <LI>
          Absenteeism, sick leave, and increased presence of negative emotions all are warning signs of burn-out.
          Psychological support can prevent the build-up of stress to the point of a burn-out or decision to leave their
          job. This is a sensitive topic and should therefore be suggested at an appropriate time. Discuss with the
          employee whether involvement of HR would help them as well, and suggest they take some time off.
        </LI>
      </UL>
    </GreetingContainer>
  );
}

export default function(props: Props) {
  let { leavePercentage, user } = props;

  let percentageStyle = {
    color: getPercentageColor(leavePercentage),
    fontSize: '3rem'
  };

  return (
    <Card>
      <SubHeading
        style={{
          ...percentageStyle,
          alignSelf: 'center'
        }}
      >
        {Math.round(leavePercentage)} %
      </SubHeading>
      <Greeting likeliness={leavePercentage} />
    </Card>
  );
}
