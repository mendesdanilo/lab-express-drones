const express = require('express');
const router = express.Router();
const Drone = require("../models/Drone.model");

// require the Drone model here

router.get('/drones', async (req, res) => {
  const drones = await Drone.find();
  res.render("drones/list", { drones }); 
  //how do I check ? if the page loads the drones list ?
});

//Create
router.get('/drones/create', (req, res) => {
  res.render("drones/create-form");
  //how do I check ? console.log ? the page is working
});

router.post('/create-form', async (req, res) => {
  const { name, propellers, maxSpeed } = req.body;
  await Drone.create ({ 
      name,
      propellers,
      maxSpeed,
  });
  res.redirect("/drones");
  // how do I check ? the page is not creating a new one
});


router.get('/drones/:id/edit', async (req, res) => {
  const droneToEdit = await Drone.findById(req.params.id);
  res.render("drones/update-form", droneToEdit);
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/edit', async (req, res) => {
  const { name, propellers, maxSpeed } = req.body;
  await Drone.findByIdAndUpdate(req.params.id, { 
      name,
      propellers,
      maxSpeed,
  });
  res.redirect("/drones"); 
  // Iteration #4: Update the drone
  // ... your code here
});



router.post('/drones/:id/delete', async (req, res) => {
  await Drone.findByIdAndRemove(req.params.id);
  res.redirect("/drones");
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
