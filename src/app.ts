import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo/init";
import { LogModel } from "./data/mongo/models/log.model";
import { Server } from "./presentation/server";

(() => {
    main();
})();

async function main (){
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    //Crear una colección, documento
    // const newLog = await LogModel.create({
    //     message: "Test message desde Mongo",
    //     origin: "App.ts",
    //     level: "low"
    // });

    // await newLog.save();
    // console.log(newLog);

    Server.start();
    // console.log(envs.PORT);
}