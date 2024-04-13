//############################### DATA MIGRATION SCRIPT ####################################################
// FIRST RUN A JSON-SERVER ON PORT 8080 AND WATCHE DATA/db.json
// THEN COMPILE AND RUN THIS TYPESCRIPT FILE

import mongoose, { Mongoose } from 'mongoose';
import Job from '../src/models/Job';
import Company from '../src/models/Company';
import Technology from '../src/models/Technology';
import { config } from '../src/config/config';

interface TechnologyData {
    name: string;
    value: string;
}

interface JobData {
    position: string;
    role: string;
    level: string;
    location: string;
    contractType: string;
    technologies: TechnologyData[];
    company: string;
}

interface CompanyData {
    name: string;
    logo: string;
    location: string;
    adress: string;
    website: string;
    phone: string;
    jobs: JobData[];
    id: string;
}

async function fetchData(): Promise<CompanyData[]> {
    try {
        const response = await fetch('http://localhost:8080/companies');
        return response.json();
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return [];
    }
}

async function populateDataBase(companies: CompanyData[]): Promise<void> {
    try {
        await mongoose.connect(config.mongo.url);
        console.log('Connection established');
        await Promise.all(
            companies.map(async (company: CompanyData) => {
                const jobs = company.jobs;
                const jobIds: string[] = [];
                for (let i = 0; i < jobs.length; i++) {
                    const jobdata = jobs[i];
                    const technologies = jobdata.technologies;
                    const techIds: string[] = [];
                    await Promise.all(
                        technologies.map(async (tech: TechnologyData) => {
                            console.log(tech);
                            const existingTech = await Technology.findOne({ value: tech.value });
                            if (!existingTech) {
                                const technology = new Technology({
                                    _id: new mongoose.Types.ObjectId(),
                                    name: tech.name,
                                    value: tech.value
                                });
                                await technology.save();
                                techIds.push(technology._id);
                            } else {
                                console.log('technology already exist');
                                techIds.push(existingTech._id);
                            }
                        })
                    );
                    const job = new Job({
                        position: jobdata.position,
                        role: jobdata.role,
                        level: jobdata.level,
                        location: jobdata.location,
                        contractType: jobdata.contractType,
                        technologies: techIds
                    });
                    await job.save();
                    jobIds.push(job._id);
                }
                const data = new Company({
                    name: company.name,
                    logo: company.logo,
                    location: company.location,
                    adress: company.location,
                    website: company.website,
                    phone: company.phone,
                    jobs: jobIds
                });
                data.save();
                for (const jobId of jobIds) {
                    const job = await Job.findById(jobId);
                    if (!job) {
                        throw new Error('Job not found');
                    }
                    job.company = data._id;
                    await job.save();
                }
            })
        );
        console.log('Data population completed');
    } catch (error) {
        console.error('Error populating database:', error);
    } finally {
        await mongoose.disconnect();
    }
}

async function main() {
    const companies = await fetchData();
    await populateDataBase(companies);
}

main();
