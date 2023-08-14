const Trains = require("../models/Trains")
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');
require("dotenv").config();
const connectDb = require("../db/connect")


const trains = [
	{
		trainName: "Delhi Door Hai Exp",
		trainNumber: "2343",
		departureTime: {
			Hours: 9,
			Minutes: 45,
			Seconds:0
		},
		seatsAvailable: {
			Sleeper: 32,
			AC: 1,
		},
		price: {
			Sleeper: 400,
			AC: 1000,	
		},
		delayedBy: 3
	},
	{
		trainName: "Chennai Exp",
		trainNumber: "2344",
		departureTime: {
			Hours: 21,
			Minutes: 35,
			Seconds:0
		},
		seatsAvailable: {
			Sleeper: 3,
			AC: 1,
		},
		price: {
			Sleeper: 450,
			AC: 1200,	
		},
		delayedBy: 15
	},
	{
		trainName: "Hyderabad Exp",
		trainNumber: "2341",
		departureTime: {
			Hours: 23,
			Minutes: 55,
			Seconds:0
		},
		seatsAvailable: {
			Sleeper: 6,
			AC: 7,
		},
		price: {
			Sleeper: 550,
			AC: 1820,	
		},
		delayedBy: 30
	}
]

async function createTrains() {
	try {
		await connectDb(process.env.MONGO_URL);
		trains.forEach(async function(train){
			await Trains.create({...train});
		})
	} catch(err){
		console.log(err);
	}

};
createTrains();

const getAllTrains = async(req,res) => {
	const trains = await Trains.find({});
	res.status(StatusCodes.OK).json(trains);  
}

const getTrain = async(req, res) => {
	const { trainNumber } = req.params
	const train = await Trains.findOne({trainNumber: trainNumber})

	if(!train){
		throw new NotFoundError(`No train with trainNumber ${trainNumber}`);
	}

	res.status(StatusCodes.OK).json(train)
}

module.exports = {
	getAllTrains,
	getTrain
}