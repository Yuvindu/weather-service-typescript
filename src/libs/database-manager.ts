import { City } from "src/entities/city.entity";
import { DataSource, EntityManager } from "typeorm";

let dataSource:DataSource

const getDatabaseConnection = async(): Promise <EntityManager> => {

if(dataSource && dataSource.isInitialized){
    console.log(`connection already available. Reusing existing connection`);
    return dataSource.manager;
} else{
    console.log(`creating connection...`);
    dataSource = new DataSource({
        applicationName: 'weather-service',
        type: 'postgres',
        host: process.env.DBHOSTNAME,
        port: parseInt(process.env.DBPORT, 10),
        database: process.env.DBNAME,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        schema: process.env.DBSCHEMA,
        connectTimeoutMS: 30000,
        synchronize: true,
        logging: false,
        useUTC: true,
        entities: [City],
    });
    return await dataSource
    .initialize()
    .then(() => {
        console.trace(`new database connection established`);
        return dataSource.manager;
    })
    .catch((e) => {
        console.debug(e, `error connecting to database`);
        throw new Error(e);
    })
}

};

export {getDatabaseConnection};