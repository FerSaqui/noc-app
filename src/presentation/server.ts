import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/logs/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log-datasource";
import { PostgressLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDataSource()
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgressLogDatasource()
);

const emailService = new EmailService();

export class Server {
    public static async start(){
        console.log("Server started...");

        //Mandar email
        // new SendEmailLogs(emailService, fileSystemLogRepository).execute(["fernando.1997.santi@gmail.com", "ferstirling@gmail.com"]);

        // emailService.sendEmailWithFileSystemLogs(
        //     ["fernando.1997.santi@gmail.com", "ferstirling@gmail.com"]
        // );

        // const logs = await logRepository.getLogs(LogSeverityLevel.high);
        // console.log(logs);
        CronService.createJob("*/5 * * * * *", () => {
            const url = "https://google.com";
            new CheckServiceMultiple(
                [fsLogRepository, mongoLogRepository, postgresLogRepository],
                () => console.log(`${url} is ok`),
                (error) => console.log(error)
            ).execute(url);
        });
    }
}