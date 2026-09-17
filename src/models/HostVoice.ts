import mongoose, { Schema, Document, Model } from 'mongoose';
import { HostVoice } from '@/lib/types';

export interface IHostVoiceDocument extends Document {
  _id: string; // e.g. 'alex-tech', 'elena-markets'
  name: string;
  role: string;
  accent: string;
  avatar: string;
  sampleAudio?: string;
  description: string;
}

const HostVoiceSchema = new Schema<IHostVoiceDocument>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    accent: { type: String, required: true },
    avatar: { type: String, required: true },
    sampleAudio: { type: String },
    description: { type: String, required: true },
  },
  { _id: false, timestamps: true }
);

export const HostVoiceModel: Model<IHostVoiceDocument> =
  mongoose.models.HostVoice ||
  mongoose.model<IHostVoiceDocument>('HostVoice', HostVoiceSchema);
