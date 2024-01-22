"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeORM = require("typeorm");
var product_1 = require("../src/entity/product");
// Create TypeORM dataSource
var dataSource = new TypeORM.DataSource({
    type: 'mysql',
    url: process.env.DATABASE_URI,
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Sridhar4444!',
    database: 'node_microservices_admin',
    entities: [product_1.Product], // Add your entities here
    synchronize: true,
});
exports.default = dataSource;
