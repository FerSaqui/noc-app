import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { CheckService } from "../../../../src/domain/use-cases/checks/check-service";

describe('check-service useCase', () => {
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    
    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallBack when fetch return true', async() => {
        const wasOk = await checkService.execute("https://www.google.com");
        expect(wasOk).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

    test('should call errorCallBack when fetch return false', async() => {
        const wasOk = await checkService.execute("https://www.gasdasd12oogle.com");
        expect(wasOk).toBeFalsy();
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });
});