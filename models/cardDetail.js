const mongoose = require("mongoose");
const validator = require("validator");

const cardDetailSchema = new mongoose.Schema({
  CreditCardNumber: {
    type: String,validate(value) {
      if (!validator.isCreditCard(value)) {
        throw new Error("Credit Card Number is invalid");}}},
  NameOnCard: {type: String},
  ExpireDate: String,
  CVC: {type: Number,validate(value) {
      if (!validator.isNumeric(value)) {
        throw new Error("CVC is invalid");}}
  },
  BankName: {type: String},
  BankNumber: {type: String},
  
  Balance:    { type: String },
  Available:  { type: String },
  LastPayment:{ type: String },
  LastPayDate: String,
  DuePayment: { type: String },
  DuePayDate: String,
  duplicated:{type:Boolean,default:false},
  

  InterestRate: { type: Number },
  CardScheme:{type:String,required:true}
});

const CardDetail = mongoose.model("CardDetail", cardDetailSchema);

module.exports = CardDetail;
