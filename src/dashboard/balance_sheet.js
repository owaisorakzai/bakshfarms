import React, {  useEffect, useState } from 'react'
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Menu2 from './menu2';
import { useForm } from "react-hook-form";



export default function BalanceSheet() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [checked,setChecked]=useState(1)

  const handlChange=(e)=>{
    setChecked(e.target.value)
  }
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
    const onSubmit=()=>{

    }
    const [object,setObject]=useState({})
    const [years,setYears]=useState([])



        useEffect(() => {
            const url='http://localhost:4242/balance_sheet/'
            axios.get(url)
            .then((res)=>{
                setObject(
                    res.data
                )
                let array=[]
                Object.keys(res.data).map((key)=>{
                  let year=key
                  let amount=0 
                  Object.keys(res.data[key]).map((k)=>{
                    amount+=res.data[key][k]
                  })
                  array.push([year,amount])
                })
                setYears(array)
            },(()=>{
                console.log('he')
            }))
          }, [])
      return <>
              <Menu2/>
              <br/>
        
              <br/>

<div className='container' id='con'>
<div className="px-4 sm:px-6 lg:px-8">
<form onSubmit={handleSubmit(onSubmit)}>
<div className='row'>
<div className='col-4'>
    <div className="form-group">
    <select className="form-select" {...register('option')} name='s_date' onChange={handlChange} aria-label="Default select example">
      <option value="1" defaultValue>By Month</option>
      <option value="2">By Year</option>
    </select>
      </div>
  </div>
  </div>
  </form>
  <br/>
  <div className="sm:flex sm:items-center">
    <div className="sm:flex-auto">
      <h1 className="text-3xl font-semibold text-gray-900">Balance Sheet</h1>
      <p className="mt-2 text-base text-gray-700">
        Complete balance sheet
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
          {checked==1 ?
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  #
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Year
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Month
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Profit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {Object.keys(object).map((key)=>{
                  var index=0
                    return(
                        Object.keys(object[key]).map((k)=>{
                          index=index+1
                            return(
                                <tr key={k}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {index}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{key}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{k}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{object[key][k]}</td>
                              </tr>

                            )
                        })
                    )
                })}
            </tbody>
          </table>
          :
          <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                #
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
           
                Year
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Profit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {
              years.map((item,index)=>{
                return(
                  <tr key={index}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {index+1}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item[0]}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item[1]}</td>
                </tr>

                )
              })

            }
          </tbody>
        </table> 
          }
          
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
      </>
}
