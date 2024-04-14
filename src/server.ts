import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
import TechnologyRoutes from './routers/Technology';
import JobRoutes from './routers/Job';
import CompanyRoutes from './routers/Company';

const router = express();

// connect to Mongo
mongoose
    .connect(config.mongo.url)
    .then(() => {
        Logging.info('connected');
        start_server();
    })
    .catch((error) => {
        Logging.error('unable to connect: ');
        Logging.error(error);
    });

// only start server when mongoose is connected
const start_server = () => {
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    router.use((req, res, next) => {
        // log the request
        Logging.info(`Incoming -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            // log the Response
            Logging.info(`Outgoing -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] - status: [${res.statusCode}]`);
        });
        next();
    });

    // routers
    router.get('/home', (req, res, next) => {
        res.status(201).json({ message: 'DevHire API withe expressjs and mongodb' });
    });

    router.use('/Technology', TechnologyRoutes);
    router.use('/Job', JobRoutes);
    router.use('/Company', CompanyRoutes);

    // healthcheck
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    // error handling
    router.use((req, res, next) => {
        const error = new Error('last route 404_not_found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
