// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var recordRTC = require('recordrtc-nodejs');

// configure app
// Add headers  
app.use(function (req, res, next) {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:49378');
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next();
});

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:Canada2015.@apollo.modulusmongo.net:27017/ju2neDih'); // connect to our database
var Bear = require('./app/models/bear');
var Trouble = require('./app/models/trouble');
var Help = require('./app/models/help);

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /bears
// ----------------------------------------------------


router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function (req, res) {
    
    var bear = new Bear();		// create a new instance of the Bear model
    bear.name = req.body.name;  // set the bears name (comes from the request)
    
    bear.save(function (err) {
        if (err)
            res.send(err);
        
        res.json({ message: 'Bear created!' });
    });

		
})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function (req, res) {
    Bear.find(function (err, bears) {
        if (err)
            res.send(err);
        
        res.json(bears);
    });
});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

	// get the bear with that id
	.get(function (req, res) {
    Bear.findById(req.params.bear_id, function (err, bear) {
        if (err)
            res.send(err); 
        res.json(bear);
    });
})

	// update the bear with this id
	.put(function (req, res) {
    Bear.findById(req.params.bear_id, function (err, bear) {
        
        if (err)
            res.send(err);
        bear.name = req.body.name; 

        bear.save(function (err) {
            if (err)
                res.send(err);
            
            res.json({ message: 'Bear updated!' });
        });

    });
})

	// delete the bear with this id
	.delete(function (req, res) {
    Bear.remove({
        _id: req.params.bear_id
    }, function (err, bear) {
        if (err)
            res.send(err);
        
        res.json({ message: 'Successfully deleted' });
    });
});


// =====================================================



// on routes that end in /trouble
// ----------------------------------------------------


router.route('/trouble')

    // create a trouble (accessed at POST http://localhost:8080/trouble)
    .post(function (req, res) {
    
    var trouble = new Trouble();      // create a new instance of the trouble model
    //trouble.name = req.body.name;  // set the trouble name (comes from the request)
    trouble.description = req.body.description;
    trouble.assignee = req.body.assignee;
    
    trouble.save(function (err) {
        if (err)
            res.send(err);
        
        res.json({ message: 'Trouble created!' });
    });

        
})

    // get all the trouble (accessed at GET http://localhost:8080/api/trouble)
    .get(function (req, res) {
    Trouble.find(function (err, trouble) {
        if (err)
            res.send(err);
        
        res.json(trouble);
    });
});

// on routes that end in /trouble/:trouble_id
// ----------------------------------------------------
router.route('/trouble/:trouble_id')

    // get the trouble with that id
    .get(function (req, res) {
    Trouble.findById(req.params.trouble_id, function (err, trouble) {
        if (err)
            res.send(err); 
        res.json(trouble);
    });
})

    // update the trouble with this id
    .put(function (req, res) {
    Trouble.findById(req.params.trouble_id, function (err, trouble) {
        
        if (err)
            res.send(err);
        trouble.name = req.body.name; 
        trouble.save(function (err) {
            if (err)
                res.send(err);
            
            res.json({ message: 'Trouble updated!' });
        });

    });
})

    // delete the trouble with this id
    .delete(function (req, res) {
    Trouble.remove({
        _id: req.params.trouble_id
    }, function (err, trouble) {
        if (err)
            res.send(err);
        
        res.json({ message: 'Successfully deleted' });
    });
});


// =====================================================


// on routes that end in /help
// ----------------------------------------------------


router.route('/help')

    // create a help (accessed at POST http://localhost:8080/help)
    .post(function (req, res) {
    
    var help = new Help();      // create a new instance of the help model
    help.description = req.body.description;  // set the help description (comes from the request)
    help.assignee = req.body.assignee;  // set the help assignee (comes from the request)
    
    help.save(function (err) {
        if (err)
            res.send(err);
        
        res.json({ message: 'Help created!' });
    });

        
})

    // get all the help (accessed at GET http://localhost:8080/api/help)
    .get(function (req, res) {
    Help.find(function (err, help) {
        if (err)
            res.send(err);
        
        res.json(help);
    });
});

// on routes that end in /help/:help_id
// ----------------------------------------------------
router.route('/help/:help_id')

    // get the help with that id
    .get(function (req, res) {
    Help.findById(req.params.help_id, function (err, help) {
        if (err)
            res.send(err); 
        res.json(help);
    });
})

    // update the help with this id
    .put(function (req, res) {
    Help.findById(req.params.help_id, function (err, help) {
        
        if (err)
            res.send(err);
        help.description = req.body.description;  // set the help description (comes from the request)
        help.example = req.body.example;  // set the help example (comes from the request)

        help.save(function (err) {
            if (err)
                res.send(err);
            
            res.json({ message: 'Help updated!' });
        });

    });
})

    // delete the help with this id
    .delete(function (req, res) {
    Help.remove({
        _id: req.params.help_id
    }, function (err, help) {
        if (err)
            res.send(err);
        
        res.json({ message: 'Successfully deleted' });
    });
});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
