import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper'
import {Product} from "../interfaces/product"
import { Link } from 'react-router-dom';
const Products = () => {
  const [products, setProducts] = useState([]);
    useEffect(()=>{
        (
          async()=>{
            const response = await fetch ('http://localhost:8000/api/products');

            const data = await response.json();

            setProducts(data);
          }
        )
        ();
    },[])


    const del= async(id:number)=>{
      if (window.confirm(`Are you sure about deleting the product ${id}:`))
      {
        await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'DELETE'
      });
      setProducts(products.filter((p:Product)=>p.id!==id))
      }
    }


  return (
    <Wrapper>
      

    <div>
    <div className="pt-3 pb-2 mb-3 border-bottom">

      <Link to='/admin/products/create' className="btn btn-info btn-lg" role="button" aria-disabled="true">Add Record!</Link>
    </div>
      <h2>Section title</h2>
      <div className="table-responsive small">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Likes</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {products.map(
            (p:Product)=>{
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td><img src={p.image} height="100"/></td>
                <td>{p.title}</td>
                <td>{p.likes}</td>
                <td>
                <Link to={`/admin/products/${p.id}/edit`} className="btn btn-light btn-lg" role="button" aria-disabled="true"><i className="fas fa-user-edit"></i>UPDATE!</Link>

                <a href="" className="btn btn-danger btn-lg" onClick={()=> del(p.id)} role="button" aria-disabled="true"><i className="fas fa-trash"></i>DELETE!</a>

                </td>
              </tr>
            )
          })}
            
            </tbody>
        </table>
      </div>
    </div>
    </Wrapper>
  )
}

export default Products
