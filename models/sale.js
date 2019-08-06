const mongoose = require("mongoose");
const validator = require("validator");

const saleSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
      trim: true
    },
    ContactNumber: {
      type: String,
      required: true,
      trim: true,
      
    },
    DateOfBirth:{type:Date,required:true},
    Phone2:{type:String},
    CellNumber:{type:String},

    CardID:[{type:mongoose.Schema.Types.ObjectId,refs :'CardDetails'}],
    KickBack: String,
    State: String,
    City: String,
    ZipCode: Number,
    Email: String,
    MotherMediansName: String,
    SocialSecurityNumber: String,
    Notes: String,
    callbackDate:Date,
    EmployementStatus:String,
    callbackTime:Date,
    SecurityWord: String,
    HighestLevelofEducation: {type: String },
    HousingStatus: {type: String},
    Address:String,
    Company: String,
    Designation: String,
    Annualincome: String,
    ChequinAccounts: {
      type: String,
      enum: ["Select","Chequin", "Saving", "Chequin-Saving", "None"],
      default: "Select"
    },
    OtherLoans: {
      type: String,
      enum: ["Select","Loan", "Mortgages", "Loan-Mortgages", "Other"],
      default: "Select"
    },
    MonthlyRentMortgage: { type: String },
    AgentId: {type: mongoose.Schema.Types.ObjectId,//when you use in axios  wrapp this id in  ObjectId()
      required: false, // this would be true 
      ref: "User"
    },
    CloserId: {
      type: mongoose.Schema.Types.ObjectId,//when you use in axios  wrapp this id in  ObjectId()
      required: false, // this would be true 
      ref: "User"
    },
    CloserStatus:  {
      type: String,
      enum: ['Transfer','Pending','Approved',"Kick Back",'Rejected','Charged Back','Call Back'],
    },
    AgentStatus:  {
      type: String,
      enum: ['Transfer','Pending','Approved',"Kick Back",'Rejected','Charged Back','Call Back'],
    },
    AdminStatus:  {
      type: String,
      enum: ['Transfer','Pending','Approved',"Kick Back",'Rejected','Charged Back','Call Back'],
    },
    CloserNotes:{type: String},
    AgentNotes: String,
    TransferDate:Date

  },
  { timestamps: true }
);

      const Sale = mongoose.model("Sale", saleSchema);
      
      module.exports = Sale;
