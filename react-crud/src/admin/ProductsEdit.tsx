import React, { PropsWithRef, SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from './Wrapper'
import { Link, Navigate, useParams } from 'react-router-dom'
import Products from './Products';
import { Product } from '../interfaces/product';


const ProductsEdit = (props:PropsWithRef<any>) => {
    const [title, setTitle]=useState('')
    const [image, setImage]=useState('')
    const [redirect, setRedirect]=useState(false)
    const params=useParams()
    useEffect(()=>{
        (
            async ()=>{
                const response=await fetch(`http://localhost:8000/api/products/${params.id}`)

                const product:Product=await response.json();
                setTitle(product.title)
                setImage(product.image)

            }
        )();
    },[])

    const submit= async (e:SyntheticEvent)=>{
        e.preventDefault();
        await fetch(`http://localhost:8000/api/products/${params.id}`,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                title,
                image
            })
        });
        alert(`Product ${params.id} Updated! Redirecting to your products page`)

        setRedirect(true)
    }
    if (redirect){
        return <Navigate to={'/admin/products'}/>
    }
  return (
    <Wrapper>
        <div className="container pt-3 pb-2 mb-3 border-bottom">
        <form onSubmit={submit}>
            <div className="form-group row">
                <input type="text" className="form-control" name="title" defaultValue={title}
                onChange={e=>setTitle(e.target.value)} required/>
            </div>
                
            <br/>
            <div className="form-group row">
                <input type="text" className="form-control" name="image" defaultValue={image} 
                onChange={e=>setImage(e.target.value)} required/>
            </div>
            <br/>
                <div >
                <Link to='/admin/products' className="btn btn-light btn-lg" role="button" aria-disabled="true">    <i className="fas fa-arrow-alt-circle-left"></i>
                    BACK!</Link>
                </div>
              <div >
                <button type="submit" className="btn btn-secondary">Submit</button>
              </div>
        </form>
        </div>

    </Wrapper>
  )
}

export default ProductsEdit
