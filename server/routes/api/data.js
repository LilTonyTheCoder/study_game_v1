const express = require('express');
// const mongodb = require('mongodb');

const router = express.Router();

// Список персонажей
const personages = require('./personages');
// Валюты
const goods = require('./goods');
// Список миссий
const missions = require('./missions');


const data = {
	goods,
	personages,
	missions
};

// Get Data
router.get('/', (req, res) => {
	res.send(data);
});




module.exports = router;
