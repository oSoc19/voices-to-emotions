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
  display: grid;
  box-sizing: border-box;
  padding: 20px 0;
  grid-template-columns: 1fr 2fr;
  grid-gap: 0 20px;
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

const CustomTooltip = styled.div`
  background: '#ffffff',
  padding: 10,
  borderRadius: '5px',
  boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
  overflow: 'hidden'
  `;

const commaToPercentage = commaValue => {
  return Math.round(commaValue * 10000) / 100;
};

const TooltipRenderer = (unit: string) => ({ active, payload }) => {
  if (active && payload) {
    let data = payload[0].payload;

    return (
      <div
        style={{
          background: '#ffffff',
          padding: 10,
          borderRadius: '5px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}
      >
        {data.datetime && <div style={{ marginBottom: 10 }}>Call Date: {data.datetime}</div>}
        {Object.keys(data).map(k => {
          if (k === 'datetime') return;

          return (
            <div key={k} style={{ fontFamily: 'roboto, sans-serif', color: '#2e2e30' }}>
              {k}: {data[k]} {unit}
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};



export default function (props: Props) {
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
      Anger: commaToPercentage(val.angry),
      Fear: commaToPercentage(val.fearful),
      Sadness: commaToPercentage(val.sad),
      Hapiness: commaToPercentage(val.happy),
      ['Positive Emotions']: commaToPercentage(val.happy),
      ['Negative Emotions']: commaToPercentage(val.angry + val.fearful + val.sad),
      datetime: moment()
        .subtract(10 - i, 'day')
        .format('DD/MM')
    };
  });

  return (
    <GraphContainer>
      <GraphInformation>
        <SubHeading style={{ fontSize: '1.5rem' }}>Emotions</SubHeading>
        <Paragraph>
          Text 1
        </Paragraph>
      </GraphInformation>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart height={250} data={emotionsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <YAxis label={{ value: 'Amount of Emotion', angle: -90, position: 'insideBottomLeft', offset: 10 }} />
          <Tooltip content={TooltipRenderer('%')} />
          <Legend align="right" verticalAlign="top" />
          <Line type="monotone" dataKey="Positive Emotions" stroke="#45a06f" />
          <Line type="monotone" dataKey="Negative Emotions" stroke="#f44336" />
        </LineChart>
      </ResponsiveContainer>

      <GraphInformation>
        <SubHeading style={{ fontSize: '1.5rem' }}>Duration</SubHeading>
        <Paragraph>
          Text2
        </Paragraph>
      </GraphInformation>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart height={250} data={durationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <YAxis label={{ value: 'Call Duration', angle: -90, position: 'insideBottomLeft', offset: 10 }} />
          <Tooltip content={TooltipRenderer('secs')} />
          <Legend align="right" verticalAlign="top" />
          <Line type="monotone" dataKey="Duration" stroke="#019de9" />
        </LineChart>
      </ResponsiveContainer>

      <GraphInformation>
        <SubHeading style={{ fontSize: '1.5rem' }}>Customer Satisfaction</SubHeading>
        <Paragraph>
          Text3
        </Paragraph>
      </GraphInformation>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart height={250} data={feedbackData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <YAxis label={{ value: 'Customer Satisfaction', angle: -90, position: 'insideBottomLeft', offset: 10 }} />
          <Tooltip content={TooltipRenderer('%')} />
          <Legend align="right" verticalAlign="top" />
          <Line type="monotone" dataKey="Customer Satisfaction" stroke="#019de9" />
        </LineChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
}
