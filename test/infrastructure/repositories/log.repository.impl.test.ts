import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";
import { LogRepositoryImpl } from "../../../src/infrastructure/repositories/log.repository.impl";

describe('log.repository.impl.ts', () => {
    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const logEntity = new LogEntity({
        level: LogSeverityLevel.low,
        message: "test",
        origin: "log.repository.impl.test.ts"
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('saveLog should call the datasource with arguments', async() => {
        const logRepository = new LogRepositoryImpl(mockLogDatasource);
        await logRepository.saveLog(logEntity);
        expect(mockLogDatasource.saveLog).toHaveBeenCalled();
        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(logEntity);
    });

    test('getLogs shpuld call the datasource with arguments', async() => {
        const logRepository = new LogRepositoryImpl(mockLogDatasource);
        await logRepository.getLogs(LogSeverityLevel.low);
        expect(mockLogDatasource.getLogs).toHaveBeenCalled();
        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
    });
});