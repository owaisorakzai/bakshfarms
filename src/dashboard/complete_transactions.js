import React, { Component, useEffect, useState } from 'react'
import axios from 'axios';
import Menu from './menu';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Menu2 from './menu2';



export default function TransactionList() {
    const Print=()=>{
        var input = document.getElementById('con');
        html2canvas(input,{
            allowTaint: true,
            useCORS: true

        })

          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
              orientation: 'landscape',
            });
            const imgProps= pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('download.pdf');
          })
        ;

    }
    const [object,setObject]=useState({
        name:"",
        transaction:[]
    })
        useEffect(() => {
            const url='http://localhost:4242/get_transactions/'
            axios.get(url)
            .then((res)=>{
                setObject({
                    name:res.data.name,
                    date:new Date(res.data.createdAt).toLocaleDateString(),
                    transaction:res.data.transactions
                })
            },(()=>{
                console.log(object)
            }))
          }, [])
      return <>
              <Menu2/>
              <br/>
      <div className='container' id='con'>

<div className="px-4 sm:px-6 lg:px-8">
  <div className="sm:flex sm:items-center">
    <div className="sm:flex-auto">
      <h1 className="text-3xl font-semibold text-gray-900">Details</h1>
      <p className="mt-2 text-base text-gray-700">
        A list of individual transactions.
      </p>
    </div>
    <br/>
    <br/>
    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
      <button
        type="button"
        id=''
        onClick={Print}
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
      >
        Print
      </button>
    </div>
  </div>
  <div className="mt-8 flex flex-col" id='con'>
    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  #
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Company
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Receipt
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Transaction Type
                </th>
                
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {object.transaction.map((element,index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {index+1}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{object.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{element.receipt}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{element.balance}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{element.transaction_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
      </>
}
