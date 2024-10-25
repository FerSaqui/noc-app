import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";

describe('log.entity.ts', () => {
    const dataObj = {
        message: "Hola mundo",
        level: LogSeverityLevel.high,
        origin: "log.entity.test.ts"
    };

    test('should create a logEntity instance', () => {
        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should crete a LogEntity instance from json', () => {
        const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2024-10-19T23:14:15.555Z","origin":"check-service.ts"}`;
        const log = LogEntity.fromJson(json);
        expect(log.message).toBe("Service https://google.com working");
        expect(log.level).toBe("low");
        expect(log.origin).toBe("check-service.ts");
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from object', () => {
        const log = LogEntity.fromObject(dataObj);
        expect(log.message).toBe("Hola mundo");
        expect(log.level).toBe("high");
        expect(log.origin).toBe("log.entity.test.ts");
        expect(log.createdAt).toBeInstanceOf(Date);
    });
});