import mongoose, { Document, Schema } from 'mongoose';

export interface IEmotionData extends Document {
  userId: mongoose.Types.ObjectId;
  textInput?: string;
  voiceInputUrl?: string;
  videoInputUrl?: string;
  emotions: {
    textSentiment?: string;
    voiceSentiment?: string;
    facialEmotions?: any;
  };
  timestamp: Date;
}

const EmotionDataSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  textInput: { type: String },
  voiceInputUrl: { type: String },
  videoInputUrl: { type: String },
  emotions: {
    textSentiment: { type: String },
    voiceSentiment: { type: String },
    facialEmotions: { type: Schema.Types.Mixed },
  },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IEmotionData>('EmotionData', EmotionDataSchema);
