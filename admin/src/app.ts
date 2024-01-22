import * as express from "express";
import * as cors from "cors";
import dataSource from "../config/ormconfig";
import {Request, Response} from 'express'
import {Product} from "./entity/product"
import { parse } from "path";
import * as amqp from "amqplib/callback_api"
import { url } from "inspector";
import { error } from "console";
import { channel } from "diagnostics_channel";
import axios from "axios";
dataSource.initialize().then(() => {
    const productRepository = dataSource.getRepository(Product);
    
    amqp.connect('amqps://soeucjcz:ZMXrYhFeGrffBaY9lkeN7-19UKj7V3Ok@lionfish.rmq.cloudamqp.com/soeucjcz', (error0,connection)=>{
        if (error0){
            throw error0
        }
        connection.createChannel((error1, channel)=>{
            if (error1){
                throw error1
            }
            const app = express();
    app.use(cors({
      origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }));
    app.use(express.json());

    app.get('/api/products', async(req: Request, res: Response)=>{
        const products=await productRepository.find()       
        res.json(products)
    })

    app.post('/api/products', async(req: Request, res: Response)=>{
        const product=await productRepository.create(req.body);
        const result=await productRepository.save(product)
        channel.sendToQueue("product_is_created_now", Buffer.from(JSON.stringify(result))) 
        return res.send(result)
        
    })

    app.get('/api/products/:id', async (req: Request, res: Response) => {
        const product = await productRepository.findOne({
            where: {
                id: parseInt(
                    req.params.id, 10)
                }
            })
            
        return res.send(product)
    })

    app.put('/api/products/:id', async (req: Request, res: Response) => {
        const product = await productRepository.findOne({
            where : {
                id : parseInt(
                    req.params.id, 10)
            }
        })
                productRepository.merge(product, req.body)
                const result = await productRepository.save(product)
                channel.sendToQueue("product_is_updated_now", Buffer.from(JSON.stringify(result))) 
                return res.send(result)
    })

    app.delete('/api/products/:id', async (req: Request, res: Response) => {
        const result=await productRepository.delete(req.params.id)
        channel.sendToQueue("product_is_deleted_now", Buffer.from(req.params.id)) 
        return res.send(result)
    })
    app.post('/api/products/:id/like', async (req: Request, res: Response) => {
        const product = await productRepository.findOne({
            where : {
                id : parseInt(
                    req.params.id, 10)
            }
        })
        await axios.post(`http://localhost:8001/api/products/${product.id}/like`, {})
                product.likes++
                await productRepository.save(product)
                return res.send(product)

    })

    console.log("Listening to port: 8000");
    app.listen(8000);
    process.on('beforeExit', ()=>{
        console.log('closing now')
        connection.close()
      })
        })
    })
  });