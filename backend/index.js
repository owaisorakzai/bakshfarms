'use strict';
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt=require('jsonwebtoken');
const app = express();
app.use(express.json());
const cors = require('cors');
let company=require('./models/companies');
const accounts = require("./models/accounts");
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose
  .connect('mongodb://127.0.0.1:27017/bakshfarms')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })


app.post("/",async (req,res,next)=>{

})

app.post("/create_company", async (req, res,next) => {
  console.log(req.body)
  company.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json('Success')
    }
  })
});
app.get('/companies_list',(req, res) => {
    company.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
app.get('/single_company/:id',(req, res,next) => {
  try{
    company.findOne({_id:req.params.id},(error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  }
  catch (error){
    res.json(error)

  }
})
app.get('/get_transactions',(req, res,next) => {
  try{
    company.find({},{name:1,transactions:1,createdAt:1},(error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  }
  catch (error){
    res.json(error)

  }
})

app.get('/balance_sheet',(req, res,next) => {
  try{
    company.find({},{name:1,transactions:1},(error, data) => {
      if (error) {
        return next(error)
      } else {
        var objects=[]
        for (let i=0;i<data.length;i++){
          if(data[i].name=="Habib Bank" || data[i].name=="MCB Bank")
          objects.push(...data[i].transactions)

        }
        var sorted = objects.sort(function(a, b) {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
        
        var byYearAndByMonth = {};
        
        sorted.forEach(function(item) {
            var month = item.createdAt.toString().substring(4,8)
            var year = item.createdAt.toString().substring(11,15)
        
            if (typeof byYearAndByMonth[year] === "undefined") {
                byYearAndByMonth[year] = {};

            }
            
            if (typeof byYearAndByMonth[year][month] === "undefined") {
                byYearAndByMonth[year][month] = 0;
            }
            byYearAndByMonth[year][month]+=item.balance;
         });        
        res.json(byYearAndByMonth)
      }
    })
  }
  catch (error){
    res.json(error)

  }
})

app.get('/companies',(req, res,next) => {
  try{
    company.find({},{name:1},(error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })

  }
  catch (error){
    res.json(error)

  }
})
app.post('/add_transaction',(req, res,next) => {
  console.log(req.body)
  company.findOne({_id:req.body.first_company},{balance:1},(error,data)=>{
    const newBalance=data.balance-Number(req.body.quantity)
    const obj={
      balance:-1 * Number(req.body.quantity),
      receipt:req.body.receipt,
      paid_to:req.body.paid_to,
      on_account_of:req.body.on_account_of,
      issued_by:req.body.issued_by,
      approved_by:req.body.approved_by,
      recieved_by:req.body.recieved_by,
      transaction_type:'Debit'
    }
    company.findOne({_id:req.body.first_company}).then((object)=>{
      object.transactions.push(obj)
      object.balance=newBalance
      object.save()

    })
  })
  company.findOne({_id:req.body.second_company},{balance:1},(error,data)=>{
    console.log(data.balance)
    const newBalance=data.balance+Number(req.body.quantity)
    const obj={
      balance:Number(req.body.quantity),
      receipt:req.body.receipt,
      paid_to:req.body.paid_to,
      on_account_of:req.body.on_account_of,
      issued_by:req.body.issued_by,
      approved_by:req.body.approved_by,
      recieved_by:req.body.recieved_by,
      transaction_type:'Credit'
    }
    company.findOne({_id:req.body.second_company}).then((object)=>{
      object.transactions.push(obj)
      object.balance=newBalance
      object.save()

    })
  })
  
})
app.post('/login', async (req, res, next) => {
  console.log(req.body.email)
  accounts.findOne({ email: req.body.email }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      if (!data) {
        res.status(401).json({
          msg: "Auth failed"
        })
      } else {
        if (data.password !== req.body.password) {
          res.status(401).json({
            msg: "Auth failed"
          })
        } else {
          const token = jwt.sign({
            email: data.email,
            userId: data._id,
            role: data.role
          }, 'asxzczxfqweqwzxcasdafv1234qq4492avferwrgh', {
            expiresIn: '5h'
          })
          res.status(200).json({
            token: token,
            userId: data._id,
            role: data.role
          })
        }
      }
    }
  })
})

app.post('/auth',(req, res) => {
  const token=req.body.token
  console.log(token)
  jwt.verify(token, 'asxzczxfqweqwzxcasdafv1234qq4492avferwrgh', function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    return res.status(200).json({
      title: 'Success',
      decoded: decoded
    });
  });
})
app.post('/register',(req, res) => {
  accounts.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    } 

})
})
app.listen(4242, () => console.log("Node server listening on port 4242!"))