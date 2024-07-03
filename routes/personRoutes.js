const express = require('express')
const router = express.Router();
const Person = require("../models/person");


// POST route to add a person
router.post("/", async (req, res) => {
    try {
      const data = req.body; //assuming the request body containes the person data
  
      // Create a new person do
      const newPerson = new Person(data);
  
      const response = await newPerson.save();
      console.log("data saved");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Internal server error" });
    }
});

// GET route to add a person
router.get("/", async (req, res) => {
  try {   
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});



router.get("/:workType", async(req,res) => {

    try {
      const workType = req.params.workType;
      if( workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({Error: 'Invalid worktype'})
      }
    } catch (err) {
        console.log(err);
        res.status(500).json({Error: 'Internal server error'})
    }
  });

// Upadate the data 
  router.put('/:id', async(req,res) => {
    try {
      const personId = req.params.id;
      const updatePersonData = req.body;

      const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
        new: true,
        runValidators: true
      });

      if(!response){
        return res.status(404).json({Error: "person not found"});
      }

      console.log("Data updated");
      res.status(200).json(response);

    } catch (err) {
      console.log(err);
      res.status(500).json({Error: "Internal server error"});
    }
  });

// Delete the data
router.delete('/:id', async(req,res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    if(!response) {
      return res.status(404).json({Error: "Person not found"});
    }

    console.log('Data Deleted');
    res.status(200).json({message: "Data deleted Successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).json({Error: "Internal server error"});
  }
});

  module.exports = router;