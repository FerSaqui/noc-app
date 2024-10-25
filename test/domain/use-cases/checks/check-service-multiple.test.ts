import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { CheckServiceMultiple } from "../../../../src/domain/use-cases/checks/check-service-multiple";

describe('check-service-multiple.ts', () => {
    const mockRepositoriesArray = [
        {
            saveLog: jest.fn(),
            getLogs: jest.fn()
        },
        {
            saveLog: jest.fn(),
            getLogs: jest.fn()
        },
        {
            saveLog: jest.fn(),
            getLogs: jest.fn()
        }
    ];

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkServiceMultiple = new CheckServiceMultiple(
        mockRepositoriesArray,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return true if its ok', async() => {
        const isOk = await checkServiceMultiple.execute("https://www.google.com");
        expect(isOk).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        
        expect(mockRepositoriesArray[0].saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepositoriesArray[1].saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepositoriesArray[2].saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('should return false if its not ok', async() => {
        const isOk = await checkServiceMultiple.execute("https://www.go123989123sd113sdffs11ad.com");
        expect(isOk).toBeFalsy();
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepositoriesArray[0].saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepositoriesArray[1].saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepositoriesArray[2].saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });
});