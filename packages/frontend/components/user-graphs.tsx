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
export default function(props: Props) {
  let { graph } = props;

  let durationData = graph.map((val: GraphItem) => {
    return {
      duration: Math.round(val.duration * 100) / 100
    };
  });

  let feedbackData = graph.map((val: GraphItem) => {
    return {
      feedback: Math.round(val.feedback * 10000) / 100
    };
  });

  let emotionsData = graph.map((graphItem: GraphItem, i: number) => {
    return {
      anger: Math.round(graphItem.angry * 10000) / 100,
      fear: Math.round(graphItem.fearful * 10000) / 100,
      sadness: Math.round(graphItem.sad * 10000) / 100,
      ['positive emotions']: Math.round(graphItem.happy * 10000) / 100,
      ['negative emotions']: Math.round((graphItem.angry + graphItem.fearful + graphItem.sad) * 10000) / 100
    };
  });

  return (
    <GraphContainer>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart width={730} height={250} data={emotionsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="positive emotions" stroke="#45a06f" unit=" %" />
          <Line type="monotone" dataKey="negative emotions" stroke="#f44336" unit=" %" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart width={730} height={250} data={durationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="duration" stroke="rgba(0, 0, 0, 0.35)" unit=" secs" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart width={730} height={250} data={feedbackData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="feedback" stroke="rgba(0, 0, 0, 0.35)" unit=" %" />
        </LineChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
}
