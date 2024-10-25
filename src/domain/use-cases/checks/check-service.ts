import { error } from "console";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
    private origin: string = "check-service.ts"

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){

    }

    public async execute(url: string): Promise<boolean> {
        try {
            const request = await fetch(url);
            if(!request.ok){
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: this.origin
            });
            this.logRepository.saveLog(log);
            this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `${url} is not ok. ${error}`;
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: this.origin
            });
            this.logRepository.saveLog(log);
            this.errorCallback(errorMessage);
            return false;
        }
    }

}