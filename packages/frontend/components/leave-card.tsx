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

  function Greeting(props) {
    const likeliness = props.likeliness;
    if (likeliness < 45) {
      return <Paragraph>This page displays the profile of {user.first_name}. The percentage on the right indicates how likely an employee is to quit. Click on it to show the calculation.
      This employee has a likeliness-to-leave below 45%, meaning they are not at risk to leave in the near future. However, frequent follow-ups are advised.
      Suggestions: - Schedule quarterly evaluations, instead of annual. This avoids frustrations to build up over time. When an employee is heard, they feel validated, which in turn leads to higher performance.
                            - Organise remain-calls, instead of only exit-calls. Ask the employee what motivates them to stay in the company, and what it would take for them to leave. This uncovers issues before they become bigger problems, and allows for a focused strategy to support the employee.</Paragraph>;
    }else if(likeliness < 65){
      return <Paragraph> This page displays the profile of {user.first_name}. The percentage on the right indicates how likely an employee is to quit. Click on it to show the calculation.
      This employee has a likeliness-to-leave between 45% and 65%, meaning they are at risk to leave in the near future. The graphs below give more information on the factors that contribute to this. Additional follow-up is advised.
      Suggestions: - This employee might feel like their accomplishments are not recognized. Inspect their performance and reward when due. A reward can be a simple e-mail, card, or note to thank them for their effort.
      - Problems with work-life balance contribute to decreases in motivation and performance. Check in with the employee by sending an e-mail to ask how they are. Suggest them to take a day off if they can.
      </Paragraph>;
    }
    return <Paragraph> This page displays the profile of {user.first_name}. The percentage on the right indicates how likely an employee is to quit. Click on it to show the calculation.
    This employee has a likeliness-to-leave above 65%, meaning they are at high risk to leave in the near future. Urgent action is required. Inspect their specific case by clicking on the + button next to the graphs. Take into account that the values displayed by the graphs that correspond to the same call, are located right beneath each other. Look for patterns, and put together a small analysis before inviting the employee. This will help with a focused conversation on what is contributing to the probability that they leave the company.  
    Suggestions: - Immediate follow-up is required, make sure to handle this personally and discretely. Invite them for a conversation to clarify that the company cares about their well-being, and values them.
                          - Absenteeism, sick leave, and increased presence of negative emotions all are warning signs of burn-out. Psychological support can prevent the build-up of stress to the point of a burn-out or decision to leave their job. This is a sensitive topic and should therefore be suggested at an appropriate time. Discuss with the employee whether involvement of HR would help them as well, and suggest they take some time off.</Paragraph>;
  }


  return (
    <Card>
      <SubHeading style={percentageStyle}>{Math.round(leavePercentage)} %</SubHeading>
      <Greeting likeliness={leavePercentage}></Greeting>
      
    </Card>
  );
}
