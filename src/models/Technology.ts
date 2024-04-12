import mongoose, { Schema, Document } from 'mongoose';

export interface ITechnology {
    name: string;
    value: string;
}

export interface ITechnologyModel extends ITechnology, Document {}

const TechnologySchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        value: { type: String, required: true, unique: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ITechnologyModel>('Technology', TechnologySchema);
