import logo from './logo.svg';
import './App.css';
import Homepage from './dashboard/homepage';
import { Navigate, Route, Routes } from 'react-router-dom';
import Details from './dashboard/details';
import TransactionLists from './dashboard/transaction_lists';
import Login from './login';
import BankVoucher from './Vouchers/bank_voucher';
import CashVoucher from './Vouchers/cash_payment';
import IncomeVoucher from './Vouchers/income_voucher';
import JournalVoucher from './Vouchers/journal_voucher';
import Tiles from './dashboard/tiles';
import AddCompany from './dashboard/add_company';
import BalanceSheet from './dashboard/balance_sheet';
function App() {
  return (
    <div>
    <section>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Tiles/>}/>
      <Route path='/ledger' element={<Homepage/>}/>
      <Route path='/bank_voucher' element={<BankVoucher/>}/>
      <Route path='/balance_sheet' element={<BalanceSheet/>}/>
      <Route path='/cash_voucher' element={<CashVoucher/>}/>
      <Route path='/income_voucher' element={<IncomeVoucher/>}/>
      <Route path='/journal_voucher' element={<JournalVoucher/>}/>
      <Route path='/add_company' element={<AddCompany/>}/>


      <Route path='/details/:id' element={<Details/>}/>
      <Route path='/transaction' element={<TransactionLists/>}/>


    </Routes>
    </section>
</div>
  );
}

export default App;
