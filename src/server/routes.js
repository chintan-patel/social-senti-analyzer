var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');
var words = require('./resources/words');
var sentiment = require('sentiment');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/words/:words', word);
router.get('/words/history', getWordHistory);
router.post('/words', postWord);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////
/**
 * API Endpoint: http://localhost:8080/api/words
 * @GET - get all words
 */
function word(req, res) {
	// Try twitter
	var newWord = req.params.word;
	var analysis = sentiment(newWord);
	
	var word = new words();
	word.Score = analysis.Score;
	word.Comparative = analysis.Comparative;
	// save the words and check for errors
	word.save(function (err, data) {
		if (err) {
			res.send(err);
		}
		res.send(wordss);
	});
};

function postWord(req, res) {
	var word = new words();
	word.Score = req.body.score;
	word.Comparative = req.body.comparative;
	// save the words and check for errors
	word.save(function (err, data) {
		if (err) {
			res.send(err);
		}
		res.send(data);
	});
}

/**
 * API Endpoint: http://localhost:8080/api/words
 * @POST
 */
function getWordHistory(req, res) {
	console.log('hict');
	var word = new word();
	word.find({}, function(err, words) {
		if(err){
			res.status(400).send(err);
		}
		res.send(words).status(200);
	});
};

/*function word(req, res, next){
    var word = req.params.word;
    var analisis = sentiment(word); 
    res.status(200).send(analisis);
}
*/

function getPeople(req, res, next) {
    res.status(200).send(data.people);
}

function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.people.filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}
