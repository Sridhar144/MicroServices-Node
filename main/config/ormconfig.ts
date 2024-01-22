import * as TypeORM from "typeorm";
import { Product } from "../src/entity/product";

// Create TypeORM dataSource
const dataSource = new TypeORM.DataSource({
  type: 'mongodb',
  // url: "mongodb://localhost:27017/",

    host: '127.0.0.1',
    database: 'node_microservices_main',
    synchronize: true,
    logging: false,
    entities: [Product], // Add your entities here
    // cli: {
    //   entitiesDir: "src/entity"
    // }
})


export default dataSource;