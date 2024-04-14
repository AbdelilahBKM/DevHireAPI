"use strict";
//############################### DATA MIGRATION SCRIPT ####################################################
// FIRST RUN A JSON-SERVER ON PORT 8080 AND WATCHE DATA/db.json
// THEN COMPILE AND RUN THIS TYPESCRIPT FILE
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Job_1 = __importDefault(require("../src/models/Job"));
const Company_1 = __importDefault(require("../src/models/Company"));
const Technology_1 = __importDefault(require("../src/models/Technology"));
const config_1 = require("../src/config/config");
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:8080/companies');
            return response.json();
        }
        catch (error) {
            console.error('Error fetching data from API:', error);
            return [];
        }
    });
}
function populateDataBase(companies) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.config.mongo.url);
            console.log('Connection established');
            yield Promise.all(companies.map((company) => __awaiter(this, void 0, void 0, function* () {
                const jobs = company.jobs;
                const jobIds = [];
                for (let i = 0; i < jobs.length; i++) {
                    const jobdata = jobs[i];
                    const technologies = jobdata.technologies;
                    const techIds = [];
                    yield Promise.all(technologies.map((tech) => __awaiter(this, void 0, void 0, function* () {
                        console.log(tech);
                        const existingTech = yield Technology_1.default.findOne({ value: tech.value });
                        if (!existingTech) {
                            const technology = new Technology_1.default({
                                _id: new mongoose_1.default.Types.ObjectId(),
                                name: tech.name,
                                value: tech.value
                            });
                            yield technology.save();
                            techIds.push(technology._id);
                        }
                        else {
                            console.log('technology already exist');
                            techIds.push(existingTech._id);
                        }
                    })));
                    const job = new Job_1.default({
                        position: jobdata.position,
                        role: jobdata.role,
                        level: jobdata.level,
                        location: jobdata.location,
                        contractType: jobdata.contractType,
                        technologies: techIds
                    });
                    yield job.save();
                    jobIds.push(job._id);
                }
                const data = new Company_1.default({
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
                    const job = yield Job_1.default.findById(jobId);
                    if (!job) {
                        throw new Error('Job not found');
                    }
                    job.company = data._id;
                    yield job.save();
                }
            })));
            console.log('Data population completed');
        }
        catch (error) {
            console.error('Error populating database:', error);
        }
        finally {
            yield mongoose_1.default.disconnect();
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const companies = yield fetchData();
        yield populateDataBase(companies);
    });
}
main();
