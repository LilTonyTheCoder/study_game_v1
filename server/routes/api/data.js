const express = require('express');
// const mongodb = require('mongodb');

const router = express.Router();

// Список персонажей
const personages = require('./personages');
// Валюты
const goods = require('./goods');
// Новый список миссий
const missionsNew = require('./missionsNew');

const data = {
	goods,
	personages,
	missionsNew
};

// Get Data
router.get('/', (req, res) => {
	res.send(data);
});




module.exports = router;
