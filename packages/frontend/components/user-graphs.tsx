import React from 'react';
import styled from '@emotion/styled';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

export type Props = { graph: Array<GraphItem> };

const GraphContainer = styled.div`
  display: grid;
  box-sizing: border-box;
  padding: 20px 0;
  grid-template-columns: 1fr;
  grid-gap: 20px 0;
  width: 100%;
`;

type GraphItem = {
  angry: number;
  calm: number;
  disgust: number;
  fearful: number;
  happy: number;
  neutral: number;
  sad: number;
  surprised: number;
  feedback: number;
  duration: number;
};

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
        {/*<div style={{
          fontFamily: 'roboto, sans-serif'
        }}>{label}</div>*/}
        {Object.keys(data).map(k => {
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

export default function(props: Props) {
  let { graph } = props;

  let durationData = graph.map((val: GraphItem) => {
    return {
      Duration: Math.round(val.duration * 100) / 100
    };
  });

  let feedbackData = graph.map((val: GraphItem) => {
    return {
      Feedback: commaToPercentage(val.feedback)
    };
  });

  let emotionsData = graph.map((graphItem: GraphItem, i: number) => {
    return {
      Anger: commaToPercentage(graphItem.angry),
      Fear: commaToPercentage(graphItem.fearful),
      Sadness: commaToPercentage(graphItem.sad),
      Hapiness: commaToPercentage(graphItem.happy),
      ['Positive Emotions']: commaToPercentage(graphItem.happy),
      ['Negative Emotions']: commaToPercentage(graphItem.angry + graphItem.fearful + graphItem.sad)
    };
  });

  return (
    <GraphContainer>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart width={730} height={250} data={emotionsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis label={{ value: 'Amount of Emotion', angle: -90, position: 'insideBottomLeft', offset: 10 }} />
          <Tooltip content={TooltipRenderer('%')} />
          <Legend align="center" verticalAlign="middle" />
          <Line type="monotone" dataKey="Positive Emotions" stroke="#45a06f" />
          <Line type="monotone" dataKey="Negative Emotions" stroke="#f44336" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart width={730} height={250} data={durationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis label={{ value: 'Call Duration', angle: -90, position: 'insideBottomLeft', offset: 10 }} />
          <Tooltip content={TooltipRenderer('secs')} />
          <Legend />
          <Line type="monotone" dataKey="Duration" stroke="#019de9" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart width={730} height={250} data={feedbackData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis label={{ value: 'Customer Feedback', angle: -90, position: 'insideBottomLeft', offset: 10 }} />
          <Tooltip content={TooltipRenderer('%')} />
          <Legend />
          <Line type="monotone" dataKey="Feedback" stroke="#019de9" />
        </LineChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
}
