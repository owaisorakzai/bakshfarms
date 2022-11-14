const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Company = new Schema({
    name: {
        type: String
    },
    balance: {
        type: Number
    },
    transactions: [
        {
        type: new mongoose.Schema(
            {
        on_account_of:String,
        paid_to:String,
        project:String,
        issued_by:String,
        approved_by:String,
        recieved_by:String,
        receipt:String,
        transaction_type:String,
        balance:Number
    },{timestamps:true})}
],
}
);
Company.set('timestamps',true)
module.exports = mongoose.model('Company', Company);