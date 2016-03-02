var router = require('express').Router();
var twitterCredentials = require('./config/twitter');
var four0four = require('./utils/404')();
var data = require('./data1');
var words = require('./resources/words');
var sentiment = require('sentiment');
var twitter = require('twitter');

var twClient = new twitter(twitterCredentials);

router.post('/words/:words', postWords);
router.get('/words/history', getWordHistory);
router.get('/chintan', testTwitter);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////
function testTwitter(req, res) {
	// Try twitter
	twClient.get('search/tweets.json?q=%23oscars&count=10', function(err, data) {
		if (err) {
			res.status(404).send(err);
		}
		console.log(data);	
		res.send(data);
		
	});
}
	
function postWords(req, res) {
	// Try twitter
	var newWord = req.body.words;
	var tweets = data.tweets;
	/*twClient.get('search/tweets.json?q=%23' + newWord + '&count=10', function(err, data) {
		if (err) {
			res.status(404).send(err);
		}
	});
	*/
	var analysis= [];
	for (var i = 0; i < tweets.statuses.length; i++) {
		analysis.push(sentiment(tweets.statuses[i].text));
	};
		var word = new words();
		word.analysis = analysis 
		// save the words and check for errors
		word.save(function (err, data) {
			if (err) {
				res.send(err);
			}
			res.send(analysis);
		});
	// });
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

