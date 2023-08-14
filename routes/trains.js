const express = require('express');
const router = express.Router();

const auth = require("../middleware/authentication")
const { getAllTrains, getTrain} = require('../controllers/trains');

router.route('/').get([auth], getAllTrains)
router.route('/:trainNumber').get([auth], getTrain)


module.exports = router;