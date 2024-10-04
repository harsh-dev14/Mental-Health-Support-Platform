import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const comprehend = new AWS.Comprehend();
const rekognition = new AWS.Rekognition();

export const analyzeTextSentiment = async (text: string): Promise<string> => {
  const params = {
    LanguageCode: 'en',
    Text: text,
  };

  const result = await comprehend.detectSentiment(params).promise();
  return result.Sentiment || 'NEUTRAL';
};

export const analyzeFacialEmotions = async (videoUrl: string): Promise<any> => {
  // Note: AWS Rekognition works with images. For video, you'd need to extract frames.
  // Alternatively, use AWS Rekognition Video for real-time video analysis.

  // This is a placeholder function
  return {};
};
