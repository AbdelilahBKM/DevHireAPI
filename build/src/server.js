"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const logging_1 = __importDefault(require("./library/logging"));
const Technology_1 = __importDefault(require("./routers/Technology"));
const Job_1 = __importDefault(require("./routers/Job"));
const Company_1 = __importDefault(require("./routers/Company"));
const router = (0, express_1.default)();
// connect to Mongo
mongoose_1.default
    .connect(config_1.config.mongo.url)
    .then(() => {
    logging_1.default.info('connected');
    start_server();
})
    .catch((error) => {
    logging_1.default.error('unable to connect: ');
    logging_1.default.error(error);
});
// only start server when mongoose is connected
const start_server = () => {
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    router.use((req, res, next) => {
        // log the request
        logging_1.default.info(`Incoming -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            // log the Response
            logging_1.default.info(`Outgoing -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] - status: [${res.statusCode}]`);
        });
        next();
    });
    // routers
    router.get('/home', (req, res, next) => {
        res.status(201).json({ message: 'DevHire API withe expressjs and mongodb' });
    });
    router.use('/Technology', Technology_1.default);
    router.use('/Job', Job_1.default);
    router.use('/Company', Company_1.default);
    // healthcheck
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
    // error handling
    router.use((req, res, next) => {
        const error = new Error('last route 404_not_found');
        logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => logging_1.default.info(`Server is running on port ${config_1.config.server.port}`));
};
