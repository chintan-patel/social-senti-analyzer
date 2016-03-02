var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');
var words = require('./resources/words');
var sentiment = require('sentiment');

router.post('/words/:words', postWords);
router.get('/words/history', getWordHistory);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////
function postWords(req, res) {
	// Try twitter
	var newWord = req.params.words;
	var analysis = sentiment(newWord);
	
	var word = new words();
	word.score = analysis.score;
	word.comparative = analysis.comparative;
	// save the words and check for errors
	word.save(function (err, data) {
		if (err) {
			res.send(err);
		}
		res.send(analysis);
	});
};

function postWord(req, res) {
	var word = new words();
	word.score = req.body.score;
	word.comparative = req.body.comparative;
	// save the words and check for errors
	word.save(function (err, data) {
		if (err) {
			res.send(err);
		}
		res.send(data);
	});
}

function getWordHistory(req, res) {
	words.find({}, function(err, data) {
		if(err){
			res.status(400).send(err);
		}
		res.send(data).status(200);
	});
};

