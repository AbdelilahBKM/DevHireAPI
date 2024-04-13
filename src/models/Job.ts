import mongoose, { Schema, Document } from 'mongoose';
import Technology, { ITechnology } from './Technology';
import { ref } from 'joi';

export interface IJob {
    position: string;
    role: string;
    level: string;
    location: string;
    contractType: string;
    technologies: string[];
    company: string;
}

export interface IJobModel extends IJob, Document {}

const JobSchema: Schema = new Schema(
    {
        position: { type: String, required: true },
        role: { type: String, required: true },
        level: { type: String, required: true },
        location: { type: String, required: true },
        contractType: { type: String, required: true },
        technologies: [{ type: Schema.Types.ObjectId, ref: 'Technology' }],
        company: { type: Schema.Types.ObjectId, ref: 'Company' }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IJobModel>('job', JobSchema);
