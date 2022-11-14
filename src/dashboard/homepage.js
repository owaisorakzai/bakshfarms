import React, { Component } from 'react'
import AddCompany from './add_company'
import AddTransaction from './add_transaction'
import Companies from './companies'
import Menu from './menu'
import Menu2 from './menu2'


export default function Homepage() {
    return (
      <div>
        <Menu2/>
        <div className='container'>
        </div>
        <br/>
        <br/>
        <br/>

        <Companies/>
      </div>
    )
}

