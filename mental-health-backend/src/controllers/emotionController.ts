import { Response } from 'express';
import EmotionData from '../models/EmotionData';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { AuthRequest } from '../middleware/authenticate';
import {
  analyzeFacialEmotions,
  analyzeTextSentiment,
} from '../services/emotionAnalysisService';

dotenv.config();

const s3 = new AWS.S3();

export const submitEmotionData = async (req: AuthRequest, res: Response) => {
  const { textInput, voiceInput, videoInput } = req.body;
  const userId = req.user.id;

  try {
    let voiceInputUrl, videoInputUrl;

    // Handle voice input upload to S3
    if (voiceInput) {
      const voiceBuffer = Buffer.from(voiceInput, 'base64');
      const voiceKey = `voice/${userId}/${Date.now()}.mp3`;

      await s3
        .putObject({
          Bucket: process.env.S3_BUCKET_NAME as string,
          Key: voiceKey,
          Body: voiceBuffer,
          ContentEncoding: 'base64',
          ContentType: 'audio/mpeg',
        })
        .promise();

      voiceInputUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${voiceKey}`;
    }

    // Handle video input upload to S3
    if (videoInput) {
      const videoBuffer = Buffer.from(videoInput, 'base64');
      const videoKey = `video/${userId}/${Date.now()}.mp4`;

      await s3
        .putObject({
          Bucket: process.env.S3_BUCKET_NAME as string,
          Key: videoKey,
          Body: videoBuffer,
          ContentEncoding: 'base64',
          ContentType: 'video/mp4',
        })
        .promise();

      videoInputUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${videoKey}`;
    }

    // Save emotion data
    const emotionData = new EmotionData({
      userId,
      textInput,
      voiceInputUrl,
      videoInputUrl,
    });

    if (textInput) {
      const textSentiment = await analyzeTextSentiment(textInput);
      emotionData.emotions.textSentiment = textSentiment;
    }

    // Analyze Facial Emotions
    if (videoInputUrl) {
      const facialEmotions = await analyzeFacialEmotions(videoInputUrl);
      emotionData.emotions.facialEmotions = facialEmotions;
    }

    await emotionData.save();

    // Trigger Lambda function for emotion analysis (optional)
    // You can use AWS SNS or directly invoke Lambda here

    res.status(201).json({
      message: 'Emotion data submitted and analyzed successfully',
      data: emotionData,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmotionHistory = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;

  try {
    const history = await EmotionData.find({ userId }).sort({ timestamp: -1 });
    res.status(200).json(history);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
