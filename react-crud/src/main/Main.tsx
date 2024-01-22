import React, { useEffect, useState } from 'react'
import Products from '../admin/Products';
import { assert } from 'console';
import { ProductMain } from '../interfaces/productmain';

const Main = () => {
  const [products, setProducts]=useState([] as ProductMain[]);

  useEffect( ()=>{
    (
      async()=>{
        const response=await fetch('http://localhost:8001/api/products')

        const data=await response.json();

        setProducts(data);
      }
    )();

  },[])

  const like = async (id:number) => {
    await fetch(`http://localhost:8001/api/products/${id}/like`,{
      method: 'POST', 
      headers:{'Content-Type':'application/json'}
    });
    setProducts(products.map(
      (p:ProductMain)=>{
        if (p.admin_id==id){
          p.likes++
        }
        return p;
      }
    ))
  }

  return (
    <div>
      <header data-bs-theme="dark">
  
  <div className="navbar navbar-dark bg-dark shadow-sm">
    <div className="container">
      <a href="#" className="navbar-brand d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" className="me-2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
        <strong>Album</strong>
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    </div>
  </div>
</header>
<main>

  <section className="py-5 text-center container">
    <div className="row py-lg-5">
      <div className="col-lg-6 col-md-8 mx-auto">
        <h1 className="fw-light">Album example</h1>
        <p className="lead text-body-secondary">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
        <p>
          <a href="#" className="btn btn-primary my-2">Main call to action</a>
          <a href="#" className="btn btn-secondary my-2">Secondary action</a>
        </p>
      </div>
    </div>
  </section>

  <div className="album py-5 bg-body-tertiary">
    <div className="container">

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {products.map(
          (p:ProductMain)=>{
            return(
              <div className="col" key={p.admin_id}>
          <div className="card shadow-sm">
            <img src={p.image} alt="" />
            <div className="card-body">
              <p className="card-text">{p.title}.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-light btn-outline-success"
                  onClick={()=>like(p.admin_id)}>Like</button>
                  {/* <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> */}
                </div>
                <small className="text-body-secondary">{p.likes} Likes</small>
              </div>
            </div>
          </div>
        </div>
            )
          }
        )}

        
          
      </div>
    </div>
  </div>

</main>
    </div>
  )
}

export default Main
