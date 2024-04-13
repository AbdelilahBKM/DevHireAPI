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
    jobs: mongoose.Types.ObjectId[];
    created_at: Date;
    updated_at: Date;
}

export interface ICompanyModel extends ICompany, Document {}

const CompanySchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        logo: { type: String, required: true, unique: true },
        location: { type: String, required: true },
        adress: { type: String, required: true },
        website: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ICompanyModel>('Company', CompanySchema);
