"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeORM = require("typeorm");
var product_1 = require("../src/entity/product");
// Create TypeORM dataSource
var dataSource = new TypeORM.DataSource({
    type: 'mongodb',
    // url: "mongodb://localhost:27017/",
    host: '127.0.0.1',
    database: 'node_microservices_main',
    synchronize: true,
    logging: false,
    entities: [product_1.Product], // Add your entities here
    // cli: {
    //   entitiesDir: "src/entity"
    // }
});
exports.default = dataSource;
