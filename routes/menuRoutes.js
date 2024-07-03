const express = require('express');
const router = express.Router();
const MenuItem = require("../models/MenuItem");


// Post route add a menuitems
router.post("/", async (req, res) => {
    try {
      const data = req.body;
  
      const newMenu = new MenuItem(data);
  
      const response = await newMenu.save();
      console.log("menu data saved");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Internal server error" });
    }
  });


// Get route to add a menuitems
router.get("/", async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log("data fetched");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: "Internal server error" });
    }
  });

router.get('/:teste', async(req,res) => {
    try {
        const teste = req.params.teste;
        
        if( teste == 'Sweet' || teste == 'Spicy' || teste == 'Sour' ) {
            const response = await MenuItem.find({test: teste});
            console.log('fatched data');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({Error: "Invalid teste type"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({Error: "Internal server error"})
    }
});

router.put('/:id', async(req,res) => {
  try {
    const menuId = req.params.id;
    const updateMenuitem = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuId,updateMenuitem, {
      new: true,
      runValidators: true
    });

    if(!response){
      return res.status(404).json({Error: " menuitem not found"});
    }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({Error: "Internal server error0"});
  }
});

router.delete('/:id', async(req,res) => {
  try {
    const menuId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuId);
    if(!response) {
      return res.status(404).json({Error: "menuitem not found"});
    }

    console.log('Data deleted');
    res.status(200).json({message: "Data deleted successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).json({Error: 'Internal server error'})
    
  }
});

module.exports = router;