import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config()

const AppDataSource = new DataSource(
    {
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": process.env.DB_PASSWORD,
        "database": "ff_db",
        "entities": ["src/entity/**"],
        "logging": true,
        "synchronize": true
    }
)

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource;