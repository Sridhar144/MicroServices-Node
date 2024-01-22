import React, { SyntheticEvent, useState } from 'react'
import Wrapper from './Wrapper'
import { Link, Navigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'


const ProductsCreate = () => {
    const [title, setTitle]=useState('')
    const [image, setImage]=useState('')
    const [redirect, setRedirect]=useState(false)


    const submit= async (e:SyntheticEvent)=>{
        e.preventDefault();
        await fetch('http://localhost:8000/api/products',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                title,
                image
            })
        });
        alert('Product Created! Redirecting to your products page')
        setRedirect(true)
        
    }
    if (redirect){
        return <Navigate to={'/admin/products'}/>
    }
  return (
    <Wrapper>
            <ToastContainer position="top-center" theme="colored" autoClose={2000} />

        <div className="container pt-3 pb-2 mb-3 border-bottom">
        <form onSubmit={submit}>
            <div className="form-group row">
                <input type="text" className="form-control" name="title" placeholder="Set the Title"
                onChange={e=>setTitle(e.target.value)} required/>
            </div>
                
            <br/>
            <div className="form-group row">
                <input type="text" className="form-control" name="image" placeholder="Link to the image" 
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

export default ProductsCreate
