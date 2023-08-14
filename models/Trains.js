const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema({
	trainName: {
		type: String,
		required: true
	},
	trainNumber: {
		type: String,
		minlength: 4,
		maxlength: 4,
		required: true
	},
	depatureTime: {
		Hours:{
			type: Number,
			default: 0,
			required: true
		},
		Minutes:{
			type: Number,
			default: 0,
			required: true
		},
		Seconds: {
			type: Number,
			default: 0,
			required: true
		}
	},
	seatsAvailable: {
		Sleeper:{
			type: Number,
			default: 0,
			required: true
		},
		AC: {
			type: Number,
			default: 0,
			required: true
		}
	},
	price: {
		Sleeper:{
			type: Number,
			default: 0,
			required: true
		},
		AC: {
			type: Number,
			default: 0,
			required: true
		}
	},
	delayedBy:{
		type: Number,
		default: 0,
		required: true
	}
});

module.exports = mongoose.model('Trains', TrainSchema);