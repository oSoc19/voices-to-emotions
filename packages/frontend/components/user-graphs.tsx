import React from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import { GraphEntry } from '@voices-to-emotions/types';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

import SubHeading from '../components/sub-heading';
import Paragraph from '../components/paragraph';

export type Props = {
  graph: Array<GraphEntry>;
};

const GraphContainer = styled.div`
  box-sizing: border-box;
  padding: 20px 0;
  grid-gap: 20px;
  width: 100%;
`;

const HideableText = styled.div<{ show: boolean }>`
  height: ${props => (props.show ? 'auto' : 0)};
  -webkit-transition: height 2s;
  transition: height 2s;
  overflow: hidden;
`;

const GraphInformation = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 20px 20px 0;

  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: 'heading heading' 'text graph';
  margin-bottom: 10px;
  grid-gap: 10px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'heading' 'text' 'graph';
  }
`;

const TooltipContainer = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const commaToPercentage = commaValue => {
  return Math.round(commaValue * 10000) / 100;
};

const POSITIVE_EMOTIONS = ['Positive Emotions', 'Neutral', 'Calm', 'Happiness'];
const NAGTIVE_EMOTIONS = ['Negative Emotions', 'Anger', 'Fear', 'Sadness', 'Disgust', 'Fearful', 'Surprised'];

const TooltipRenderer = (unit: string) => ({ active, payload }) => {
  if (active && payload) {
    let data = payload[0].payload;

    return (
      <TooltipContainer>
        {data.datetime && <div style={{ marginBottom: 10 }}>Call Date: {data.datetime}</div>}
        {Object.keys(data).map(k => {
          if (k === 'datetime') return;

          return (
            <div
              key={k}
              style={{
                fontFamily: 'roboto, sans-serif',
                color: POSITIVE_EMOTIONS.includes(k) ? '#45a06f' : NAGTIVE_EMOTIONS.includes(k) ? '#f44336' : '#2e2e30'
              }}
            >
              {k}: {data[k]} {unit}
            </div>
          );
        })}
      </TooltipContainer>
    );
  }

  return null;
};

const showReducer = (state, action) => {
  let newState = { ...state };

  newState[action.id] = !newState[action.id];

  return newState;
};

export default function(props: Props) {
  let { graph } = props;
  let [showState, dispatchShow] = React.useReducer(showReducer, {});

  let durationData = graph.map((val: GraphEntry, i: number) => {
    return {
      Duration: Math.round(val.duration * 100) / 100,
      datetime: moment()
        .subtract(10 - i, 'day')
        .format('DD/MM')
    };
  });

  let feedbackData = graph.map((val: GraphEntry, i: number) => {
    return {
      ['Customer Satisfaction']: commaToPercentage(val.feedback),
      datetime: moment()
        .subtract(10 - i, 'day')
        .format('DD/MM')
    };
  });

  let emotionsData = graph.map((val: GraphEntry, i: number) => {
    return {
      // Positive Emotions
      ['Positive Emotions']: commaToPercentage(val.happy + val.neutral + val.calm),
      Happiness: commaToPercentage(val.happy),
      Neutral: commaToPercentage(val.neutral),
      Calm: commaToPercentage(val.calm),

      // Negative Emotions
      ['Negative Emotions']: commaToPercentage(val.angry + val.fearful + val.sad + val.disgust + val.surprised),
      Anger: commaToPercentage(val.angry),
      Fear: commaToPercentage(val.fearful),
      Sadness: commaToPercentage(val.sad),
      Disgust: commaToPercentage(val.disgust),
      Fearful: commaToPercentage(val.fearful),
      Surprised: commaToPercentage(val.surprised),

      datetime: moment()
        .subtract(10 - i, 'day')
        .format('DD/MM')
    };
  });

  return (
    <GraphContainer>
      <GraphInformation>
        <SubHeading style={{ fontSize: '1.5rem', gridArea: 'heading' }}>Emotions</SubHeading>

        <Paragraph onClick={() => dispatchShow({ id: 0 })}>
          This graph shows an overview of the emotions recorded in each call. The green line indicates the percentage of
          fragments that are classified as a positive emotion, namely happy. The red line indicates the percentage of
          fragments that are classified as a negative emotion, namely angry, sad, or fearful. Each call is a time point.
        </Paragraph>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart height={250} data={emotionsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" interval="preserveStartEnd" />
            <YAxis label={{ value: 'Amount of Emotion', angle: -90, position: 'insideBottomLeft', offset: 10 }} />
            <Tooltip content={TooltipRenderer('%')} />
            <Legend align="right" verticalAlign="top" />
            <Line type="monotone" dataKey="Positive Emotions" stroke="#45a06f" />
            <Line type="monotone" dataKey="Negative Emotions" stroke="#f44336" />
          </LineChart>
        </ResponsiveContainer>

        <HideableText show={showState[0]}>
          Employees who experience more negative emotions and less positive emotions, are at risk for burn-out and are
          more likely to quit their job. Do not look at this in isolation, but compare with the other graphs: this
          allows for interpretation and limits false conclusions. For example, a high percentage of negative emotions
          might indicate that the employee experiences more negative emotions during the phone call. However, if the
          length of the call was very short, only one fragment that is (miss)classified as a negative emotion, will have
          more of an impact on the graph than in the case of a longer call.
        </HideableText>
      </GraphInformation>

      <GraphInformation>
        <SubHeading style={{ fontSize: '1.5rem', gridArea: 'heading' }}>Duration</SubHeading>

        <Paragraph>
          This graph shows an overview of the length of each call, in seconds. Longer calls than normally might indicate
          that the employee is less attentive or motivated. Shorter calls than normally might indicate that the employee
          rushes the calls and feels bored. The likeliness-to-leave percentage is influenced by a deviation in call
          length from the average of the last 10 calls for this specific employee, and thus both longer and shorter
          calls than normally increase how likely this employee would quit.
        </Paragraph>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart height={250} data={durationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" interval="preserveStartEnd" />
            <YAxis label={{ value: 'Call Duration', angle: -90, position: 'insideBottomLeft', offset: 10 }} />
            <Tooltip content={TooltipRenderer('secs')} />
            <Legend align="right" verticalAlign="top" />
            <Line type="monotone" dataKey="Duration" stroke="#019de9" />
          </LineChart>
        </ResponsiveContainer>
      </GraphInformation>

      <GraphInformation>
        <SubHeading style={{ fontSize: '1.5rem', gridArea: 'heading' }}>Customer Satisfaction</SubHeading>

        <Paragraph>
          This graph shows an overview of feedback the customer gives the call. After the conversation, they get an
          e-mail to rate the call out of 100, based on how satisfied they are with the service provided. Customer
          satisfaction is not incorporated in the model, but is displayed here to inspect the other variables per call
          within their context. NOTE: for now, this is simulated data.
        </Paragraph>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart height={250} data={feedbackData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" interval="preserveStartEnd" />
            <YAxis label={{ value: 'Customer Satisfaction', angle: -90, position: 'insideBottomLeft', offset: 10 }} />
            <Tooltip content={TooltipRenderer('%')} />
            <Legend align="right" verticalAlign="top" />
            <Line type="monotone" dataKey="Customer Satisfaction" stroke="#019de9" />
          </LineChart>
        </ResponsiveContainer>
      </GraphInformation>
    </GraphContainer>
  );
}
