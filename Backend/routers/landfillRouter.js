// external imports
const express = require("express");

// internal imports
const { addNewLandfill, addLandfillManager, getAllLandfills, getLandfillByID } = require("../controllers/landfillController");

// router initialization
const router = express.Router();

// routes
// add new landfill
router.post("/add-landfill", addNewLandfill);

// add landfill manager
router.post("/add-landfill-manager", addLandfillManager);

// get all landfills
router.get("/all-landfills", getAllLandfills);

// get landfill by id
router.get("/:landfillID", getLandfillByID);

// export
module.exports = router;