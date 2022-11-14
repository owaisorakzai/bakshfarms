
import {
    AcademicCapIcon,
    BadgeCheckIcon,
    CashIcon,
    ClockIcon,
    ReceiptRefundIcon,
    UsersIcon,
  } from '@heroicons/react/outline'
  import { useNavigate } from "react-router-dom";

import axios from 'axios'
import { useEffect } from 'react'
  
  const actions = [
    {
      title: 'Create Bank Payment Voucher',
      href: '/bank_voucher',
      icon: ClockIcon,
      iconForeground: 'text-green-700',
      iconBackground: 'bg-teal-50',
    },
    {
        title: 'Create Income Payment Voucher',
        href: '/income_voucher',
        icon: BadgeCheckIcon,
      iconForeground: 'text-green-700',
      iconBackground: 'bg-purple-50',
    },
    {
        title: 'Create Cash Payment Voucher',
        href: '/cash_voucher',
        icon: UsersIcon,
      iconForeground: 'text-green-700',
      iconBackground: 'bg-sky-50',
    },
    {
        title: 'Create Journal Payment Voucher',
        href: '/journal_voucher',
        icon: ReceiptRefundIcon,
      iconForeground: 'text-green-700',
      iconBackground: 'bg-rose-50',
    },
    { title: 'View Ledger', 
    href: '/ledger',
    icon: CashIcon, 
    iconForeground: 'text-green-700',
    iconBackground: 'bg-yellow-50' },

    {
      title: 'Create Ledger',
      href: 'add_company',
      icon: AcademicCapIcon,
      iconForeground: 'text-green-700',
      iconBackground: 'bg-indigo-50',
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function Tiles() {
    let navigate = useNavigate();
    
    useEffect(() => {
      const token=localStorage.getItem('token')
      if(!token){
        navigate('/')
      }
      else{
      axios.post('http://localhost:4242/auth',{token:token}).then((resp)=>{
        
        if(resp.data.decoded.role!=="accountant"){
          navigate('/')
        }
        else{
        }
      })
    }
    }, [])
    return (
        <div className='container'>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1 className='text-3xl'><b>Welcome to Baksh Farms</b></h1>
            <br/>
            <br/>
      <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
              actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
              'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
            )}
          >
            <div>
              <span
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  'rounded-lg inline-flex p-3 ring-4 ring-white'
                )}
              >
                <action.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <a href={action.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et
                quo et molestiae.
              </p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
      </div>
    )
  }