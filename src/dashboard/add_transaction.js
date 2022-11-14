import React, { useEffect } from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";

export default function AddTransaction() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const [data, setData] = React.useState([]);
    const onSubmit = data => {
        axios.post('http://localhost:4242/add_transaction', data)
        .then(res => {
        }).catch(error => {
            console.log(error);
            
        }
        )
        window.location.reload(true)

    }
    useEffect(()=>{
        axios.get('http://localhost:4242/companies').then((res)=>{
            setData(res.data)
        })


    })
  return (
    <div>
    <br/>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#saleModel">
        Add Transaction
    </button>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="modal fade" id="saleModel" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title text-right" id="exampleModalLabel">Add Product</h5>
            </div>
            

        <div className="modal-body">
        <div className="col-12">
                <label className="form-label">Receipt Type:</label>
                <input type="text" className="form-control form-control-sm" id="purchase" {...register("receipt")}/>
        </div>
            <div className="col-12">
                <label className="form-label">From: </label>
                <select className="form-select" {...register('first_company')} aria-label="Default select example">
                <option defaultValue={0}>Select First Company</option>
                {data.map(item => {
                    return <option key={item._id} value={item._id}>{item.name}</option>
                }

                )}
                </select>      
            </div> 
            <div className="col-12">
                <label className="form-label">To: </label>
                <select className="form-select" {...register("second_company")} aria-label="Default select example">
                <option defaultValue={0}>Select Second Company</option>
                {data.map(item => {
                    return <option key={item._id} value={item._id}>{item.name}</option>
                }

                )}
                </select>      
            </div> 
            <div className="col-12">
                <label className="form-label">Amount</label>
                <input type="number" className="form-control form-control-sm" id="purchase" {...register("quantity")}/>
            </div>
            <div className="col-12">
                <label className="form-label">Description</label>
                <input type="text" className="form-control form-control-sm" id="sale" {...register("description")}/>
            </div>                     
        </div>
        <div className="modal-footer">
            <input type="submit" className="btn btn-primary" />
        </div>
        </div>
    </div>
    </div>
    </form>
</div>
  )
}
