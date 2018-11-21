var express = require('express');
var router = express.Router();
var config = require('../config/config.json');

var bot_services = require('./bot_services');

//favicon.ico request
router.post('/favicon.ico', function(req, res) {
    res.status(204);
    // to do: enhance to display website icon
    //res.status(config.http_code.ok);
    //res.res.sendFile('../favicon.png');
});

//admin services
router.post('/disable_monitor', bot_services.disable_monitor); //done
router.post('/update_last_beat', bot_services.update_last_beat); //done
router.get('/check_bot/:bot_id', bot_services.check_bot); //done

module.exports = router;