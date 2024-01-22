import * as TypeORM from "typeorm";
import { Product } from "../src/entity/product";

// Create TypeORM dataSource
const dataSource = new TypeORM.DataSource({
  type: 'mysql',
  url: process.env.DATABASE_URI,

    host: 'localhost',
    // port,
    // username',
    // password',
    database: 'node_microservices_admin',
    entities: [Product], // Add your entities here
    synchronize: true,
})


export default dataSource;
