import React from 'react';
import styled from '@emotion/styled';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

export type Props = {
  happiness: Array<number>;
  anger: Array<number>;
  fear: Array<number>;
  sadness: Array<number>;
  durations: Array<number>;
  feedback: Array<number>;
};

const GraphContainer = styled.div`
  display: grid;
  box-sizing: border-box;
  padding: 20px 0;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px 0;
  width: 100%;
`;

export default function(props: Props) {
  let { happiness, anger, fear, sadness, durations, feedback } = props;

  console.log({ happiness, anger, fear, sadness, durations, feedback });

  let hapinessData = happiness.map((val: number) => {
    return {
      happiness: val
    };
  });

  let durationData = durations.map((val: number) => {
    return {
      duration: val
    };
  });

  let feedbackData = feedback.map((val: number) => {
    return {
      feedback: val
    };
  });

  let emotionsData = anger.map((angerVal: number, i: number) => {
    return {
      anger: angerVal,
      fear: fear[i],
      sadness: sadness[i]
    };
  });

  return (
    <GraphContainer>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart width={730} height={250} data={hapinessData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="happiness" stroke="#45a06f" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart width={730} height={250} data={emotionsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="anger" stroke="#f44336" />
          <Line type="monotone" dataKey="fear" stroke="#FF8989" />
          <Line type="monotone" dataKey="sadness" stroke="#FEB069" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart width={730} height={250} data={durationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="duration" stroke="rgba(0, 0, 0, 0.35)" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart width={730} height={250} data={feedbackData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="feedback" stroke="rgba(0, 0, 0, 0.35)" />
        </LineChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
}
