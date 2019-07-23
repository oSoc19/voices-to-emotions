import React from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import { GraphEntry } from '@voices-to-emotions/types';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  Legend,
  Line,
  ResponsiveContainer
} from 'recharts';

import SubHeading from './sub-heading';
import Paragraph from './paragraph';
import { Tooltip, TooltipContainer } from './tooltip';

export type Props = {
  graph: Array<GraphEntry>;
};

const GraphContainer = styled.div`
  display: grid;
  box-sizing: border-box;
  padding: 20px 0;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px 20px;
  width: 100%;

  @media (max-width: 960px) {
    grid-template-rows: repeat(3, auto 1fr);
    grid-template-columns: 1fr;
  }
`;

const GraphInformation = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 20px 0 0;
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
        {data.datetime && (
          <div
            style={{ marginBottom: 10, fontWeight: 500, borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 10 }}
          >
            Call Date: {data.datetime}
          </div>
        )}
        {Object.keys(data).map(k => {
          if (k === 'datetime') return;

          return (
            <div
              key={k}
              style={{
                fontFamily: 'inherit',
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

export default function(props: Props) {
  let { graph } = props;

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

  let text1 =
    'The green line represents the percentage of fragments that sound happy. The red line represents the percentage of fragments that sound angry, sad, or fearful. Every point corresponds to the averages of one day. For more detailed information for each day, hoover over the graph. More negative emotions and less positive emotions increases the risk of burnout and likeliness to quit a job.';
  let text2 =
    'Longer calls than normally indicate that the employee is less attentive or motivated. Shorter calls than normally indicate that the employee rushes the calls and feels bored. Both a sudden drop or rise in call length correspond to a higher likeliness-to-leave.';
  let text3 =
    'After each call, the customers have the possibility to rate the service provided out of 100. Customer satisfaction is not incorporated in the model, but is displayed here to inspect the other variables per call within their context.';

  return (
    <GraphContainer>
      <GraphInformation>
        <SubHeading style={{ fontSize: '1.5rem' }}>Emotions</SubHeading>

        <Tooltip placement="bottom" hideArrow="true" trigger="hover" tooltip={text1}>
          <Paragraph>
            The graph on the right shows an overview of the emotions recorded, per day (hoover cursor here for more
            information).
          </Paragraph>
        </Tooltip>
      </GraphInformation>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart height={220} data={emotionsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <YAxis label={{ angle: -90, position: 'insideBottomLeft', offset: 10 }} />
          <ChartTooltip content={TooltipRenderer('%')} />
          <Legend align="right" verticalAlign="top" />
          <Line type="monotone" dataKey="Positive Emotions" stroke="#45a06f" />
          <Line type="monotone" dataKey="Negative Emotions" stroke="#f44336" />
        </LineChart>
      </ResponsiveContainer>

      <GraphInformation>
        <SubHeading style={{ fontSize: '1.5rem' }}>Duration</SubHeading>
        <Tooltip placement="bottom" hideArrow="true" trigger="hover" tooltip={text2}>
          <Paragraph>
            The graph on the right shows an overview of the average length of the calls, per day (hoover cursor here for
            more information).
          </Paragraph>
        </Tooltip>
      </GraphInformation>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart height={220} data={durationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <YAxis label={{ angle: -90, position: 'insideBottomLeft', offset: 10 }} />
          <ChartTooltip content={TooltipRenderer('secs')} />
          <Legend align="right" verticalAlign="top" />
          <Line type="monotone" dataKey="Duration" stroke="#019de9" />
        </LineChart>
      </ResponsiveContainer>

      <GraphInformation>
        <SubHeading style={{ fontSize: '1.5rem' }}>Customer Satisfaction</SubHeading>
        <Tooltip placement="bottom" hideArrow="true" trigger="hover" tooltip={text3}>
          <Paragraph>
            The graph on the right shows an overview of the average feedback this employee received from the customers,
            per day (hoover cursor here for more information).
          </Paragraph>
        </Tooltip>
      </GraphInformation>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart height={220} data={feedbackData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <YAxis label={{ angle: -90, position: 'insideBottomLeft', offset: 10 }} />
          <ChartTooltip content={TooltipRenderer('%')} />
          <Legend align="right" verticalAlign="top" />
          <Line type="monotone" dataKey="Customer Satisfaction" stroke="#019de9" />
        </LineChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
}
