import React, { useEffect } from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";
import Menu2 from './menu2';

export default function AddCompany() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const [data, setData] = React.useState([]);
    const onSubmit = data => {
        axios.post('http://localhost:4242/create_company', data)
        .then(res => {
            window.location.reload(true)

        }).catch(error => {
            console.log(error);
            
        }
        )
    }
  return (
    <div>
    <Menu2/>
    <br/>
    <br/>
    <br/>
<form onSubmit={handleSubmit(onSubmit)} className='container'>
<h1 className='text-3xl'><b>Create Ledger</b></h1>
    <br/>
      <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name:</label>
            <input type="text" {...register("name")} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name:" required="" />
        </div>
        <br/>
      <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Initial Amount:</label>
            <input type="number" {...register("balance")} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Initial Amount:" required="" />
        </div>
        <br/>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
</div>
  )
}
