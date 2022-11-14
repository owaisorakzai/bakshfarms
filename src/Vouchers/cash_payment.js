import React, { useEffect } from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";
import Menu2 from '../dashboard/menu2';

export default function CashVoucher() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const [data, setData] = React.useState([]);
    const onSubmit = data => {
        axios.post('http://localhost:4242/add_transaction', data)
        .then(res => {
            alert('Transaction Added')
        }).catch(error => {
            console.log(error);
            
        }
        )

    }
    useEffect(()=>{
        axios.get('http://localhost:4242/companies').then((res)=>{
            setData(res.data)
        })
    })
  return (
    <div>
    <Menu2/>
    <br/>
    <br/>
    <br/>
<form onSubmit={handleSubmit(onSubmit)} className='container'>
<h1 className='text-3xl'><b>Cash Payment Voucher</b></h1>
    <br/>
<div class="mb-6">
        <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Receipt Type</label>
        <input id="type" {...register("receipt")} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={'Cash Payment Voucher'} required="" readOnly/>
    </div> 
    
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Paid To:</label>
            <input type="text" {...register("paid_to")} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Paid To:" required="" />
        </div>
        <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">On Account of:</label>
            <input type="text" {...register("on_account_of")} id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="On Account Of:" required="" />
        </div>
        <div>
        <label for="company1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
          <select id="company1" {...register('first_company')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option defaultValue={0}>Select First Company</option>
                {data.map(item => {
                    return <option key={item._id} value={item._id}>{item.name}</option>
                }

                )}
          </select>
       </div> 
        <div>
        <label for="company2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
          <select id="company2" {...register('second_company')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option defaultValue={0}>Select Second Company</option>
                {data.map(item => {
                    return <option key={item._id} value={item._id}>{item.name}</option>
                }

                )}
          </select>
       </div>
        <div>
            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project</label>
            <input type="text" id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("project")} placeholder="Enter project" required="" />
        </div>
        <div>
            <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amount</label>
            <input type="number" id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("quantity")} placeholder="" required="" />
        </div>
    </div>
    <div class="grid gap-6 mb-6 md:grid-cols-3">
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Issued By:</label>
            <input type="text" {...register("issued_by")} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Issued By:" required="" />
        </div>
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recieved By:</label>
            <input type="text" {...register("recieved_by")} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Recieved By:" required="" />
        </div>
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Approved By:</label>
            <input type="text" {...register("approved_by")} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Approved By:" required="" />
        </div>
      </div>
      <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sum in Words:</label>
            <input type="text" {...register("sun_words")} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sum in Words:" required="" />
        </div>
        <br/>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
</div>
  )
}
