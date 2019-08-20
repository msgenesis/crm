const Sale =require('../models/sale')
const express = require("express");
const AccessIp = require("../models/accessIp");
const router = new express.Router();

// router.post("/accessIp", async (req, res) => {
//   const accessIp = new AccessIp(req.body);
//       console.log(accessIp)
//   try {
//     await accessIp.save();
//     res.status(201).send(accessIp);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

router.get("/accessIps", async (req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    
    try {
      console.log("ip is", ip);
      res.send(ip);
    } catch (e) {
     res.status(500).send(e)
    }
  });
  

router.get("/accessIp", async (req, res,next) => {
  let accessIps = await AccessIp.findOne({});
  const accessIp = new AccessIp({ip:[]}); 
  console.log(!accessIp)
  try {
    if(!accessIps) {
      await  accessIp.save();
      res.send(accessIps);
      next();
    }
    res.send(accessIps);
  } catch (e) {
    res.status(500).send(e);
  }
});


router.patch("/accessIp/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["ip"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  console.log("from the server", isValidOperation);
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    const accessIp = await AccessIp.findByIdAndUpdate(req.params.id, { ip: req.body.ip });
    // const user = await User.findByIdAndUpdate(req.params.id,req.body,{ new:true , runValidators:true})

    res.send(accessIp);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/Transfer/:id", async (req, res) => {
  const {Status ,AdminStatus,CloserStatus , AdminId} = req.body
   
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, { CloserStatus, AdminStatus,Status , AdminId});
    
    console.log(sale)
    res.send(sale);
  } catch (e) {
    console.log(e)
    res.status(400).send(e);
  }
});


module.exports = router;
