import mongoose, { Schema, Document } from 'mongoose';
import Job, { IJob } from './Job';
import { ref } from 'joi';

export interface ICompany {
    name: string;
    logo: string;
    location: string;
    adress: string;
    website: string;
    phone: string;
    jobs: IJob[];
}

export interface IJobModel extends IJob, Document {}

const CompanySchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        logo: { type: String, required: true, unique: true },
        location: { type: String, required: true },
        adress: { type: String, required: true },
        website: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IJobModel>('Company', CompanySchema);
