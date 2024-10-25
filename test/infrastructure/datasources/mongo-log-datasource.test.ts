import mongoose from "mongoose";
import { envs } from "../../../src/config/plugins/envs.plugin";
import { MongoDatabase } from "../../../src/data/mongo/init";
import { MongoLogDataSource } from "../../../src/infrastructure/datasources/mongo-log-datasource";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";
import { LogModel } from "../../../src/data/mongo/models/log.model";

describe('mongo-log-datasource.test.ts', () => {
    const logDataSource = new MongoLogDataSource();

    beforeAll(async() => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        });
    });

    afterAll(async() => {
        await LogModel.deleteMany();
        mongoose.connection.close();
    });

    test('should create a log', async() => {
        const logSpy = jest.spyOn(console, "log");

        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: "test message",
            origin: "mongo-log-datasource.test.ts"
        });

        await logDataSource.saveLog(log);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo log created: ", expect.any(String));
    });

    test('should get Logs ', async() => {
        const logs = await logDataSource.getLogs(LogSeverityLevel.medium);
        expect(logs.length).toBeGreaterThanOrEqual(1);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);
    });
});