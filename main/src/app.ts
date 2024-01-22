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
import axios from 'axios'
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

            channel.assertQueue('product_is_created_now',{durable:false})
            channel.assertQueue('product_is_updated_now',{durable:false})
            channel.assertQueue('product_is_deleted_now',{durable:false})
            const app = express();
            app.use(cors({
              origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
            }));
            app.use(express.json());
            channel.consume('product_is_created_now',async(msg)=>{
              const eventProduct: Product=JSON.parse(msg.content.toString())
              const product=new Product()
              product.admin_id=parseInt(eventProduct.id)
              product.title=eventProduct.title
              product.image=eventProduct.image
              product.likes=eventProduct.likes
              await productRepository.save(product)
              console.log("product created")
            },{noAck:true})
            channel.consume('product_is_updated_now',async(msg)=>{
              const eventProduct: Product = JSON.parse(msg.content.toString())
                const product = await productRepository.findOne({
                  where:{
                    admin_id: parseInt(eventProduct.id)}})
                productRepository.merge(product, {
                    title: eventProduct.title,
                    image: eventProduct.image,
                    likes: eventProduct.likes
                })
                await productRepository.save(product)
                console.log('product updated')
            }, {noAck: true})
            channel.consume('product_is_deleted_now',async(msg)=>{
              const admin_id=parseInt(msg.content.toString())
              await productRepository.delete({admin_id})
                console.log('product deleted')
            })
            app.get('/api/products', async(req:Request, res: Response)=>{
              const products=await productRepository.find()
              return res.send(products)
            })

            app.post('/api/products/:id/like', async (req: Request, res: Response) => {
              const product = await productRepository.findOne({
                where:{
                  admin_id:
                  parseInt(req.params.id,10)}})
                  console.log(product.title)
                  await axios.post(`http://localhost:8000/api/products/${product.admin_id}/like`, {})
                product.likes++
                await productRepository.save(product)
                return res.send(product)
            })
            console.log("Listening to port: 8001");
            app.listen(8001);
            process.on('beforeExit', ()=>{
              console.log('closing now')
              connection.close()
            })
        })
  })
});