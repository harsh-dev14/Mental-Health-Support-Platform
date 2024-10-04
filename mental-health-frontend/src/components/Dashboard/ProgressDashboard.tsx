import React from 'react';
import useFetch from '../../hooks/useFetch';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface EmotionData {
  emotions: {
    textSentiment?: string;
    voiceSentiment?: string;
    facialEmotions?: any;
  };
  timestamp: string;
}

const ProgressDashboard: React.FC = () => {
  const { data, loading, error } = useFetch<EmotionData[]>('/emotions/history');

  // Prepare data for the chart
  const chartData = {
    labels: data?.map((d) => new Date(d.timestamp).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Text Sentiment',
        data: data?.map((d) => sentimentToScore(d.emotions.textSentiment)) || [],
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
      {
        label: 'Voice Sentiment',
        data: data?.map((d) => sentimentToScore(d.emotions.voiceSentiment)) || [],
        fill: false,
        backgroundColor: 'green',
        borderColor: 'green',
      },
      // Add more datasets for facialEmotions if needed
    ],
  };

  const sentimentToScore = (sentiment?: string): number => {
    switch (sentiment) {
      case 'POSITIVE':
        return 1;
      case 'NEGATIVE':
        return -1;
      case 'NEUTRAL':
        return 0;
      default:
        return 0;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h3>Your Progress</h3>
      {data && data.length > 0 ? <Line data={chartData} /> : <p>No emotion data available.</p>}
    </div>
  );
};

export default ProgressDashboard;
