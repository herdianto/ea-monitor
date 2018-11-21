var path = require('path');
var mysql = require('mysql');
var query = require('../helper/db_connection');
var date = require('date-and-time');
var jwt = require('jwt-simple');
var config = require('../config/config.json');
var waterfall = require('a-sync-waterfall');
var moment = require('moment');
var randomstring = require("randomstring");
const request = require('request');
var email_service = require('../helper/email_connection');

var user_services = {
  disable_monitor: function(req, res){
    let params_update =[req.body.isEnable, req.body.bot_id];
    let query_cmd_update = "UPDATE ea SET enable = ? WHERE bot_id = ?";
    //console.log(mysql.format(query_cmd_update, params_update));
    query(mysql.format(query_cmd_update, params_update)).then(function(result_1){
      if(result_1.affectedRows = 1){
        res.json({
          "status": "ok",
          "message": "Update success"
        });
      }else{
        res.json({
          "status": "err",
          "message": "Update failed"
        });
      }
    });
  },
  update_last_beat: function(req, res){
    let params_update =[req.body.bot_id];
    let query_cmd_update = "UPDATE ea SET last_beat = now() WHERE bot_id = ?";
    //console.log(mysql.format(query_cmd_update, params_update));
    query(mysql.format(query_cmd_update, params_update)).then(function(result_1){
      if(result_1.affectedRows = 1){
        let params_update2 =[req.body.bot_id];
        let query_cmd_update2 = "UPDATE ea set update_count = update_count + 1 WHERE bot_id = ?";
        //console.log(mysql.format(query_cmd_update2, params_update2));
        query(mysql.format(query_cmd_update2, params_update2))
        res.json({
          "status": "ok",
          "message": "Update success"
        });
      }else{
        res.json({
          "status": "err",
          "message": "Update failed"
        });
      }
    });
  },
  check_bot: function(req, res){
    let params_select =[req.params.bot_id, req.params.bot_id, 'yes'];
    let query_cmd_select = "SELECT (email_frequency - TIMESTAMPDIFF(minute,(SELECT last_beat FROM ea WHERE bot_id = ?) , now()))" + 
    "as diff, last_beat, email_to, last_check FROM ea WHERE bot_id = ? and enable = ? limit 1";
    //console.log(mysql.format(query_cmd_select, params_select));
    query(mysql.format(query_cmd_select, params_select)).then(function(result_1){
      for(let i=0; i<result_1.length; i++){
        //console.log("diff = " + result_1[i].diff);
        if(result_1[i].diff < 0){
          let mailOptions = {
            to: result_1[0].email_to,
            subject: 'Bot is Down, last beat: ' + result_1[i].diff * -1 +' minute(s) ago',
            html: 'Bot is Down, last beat: ' + result_1[i].diff * -1 +' minute(s) ago'
          };
          //send email to user
          email_service.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log("error: "+error);
              res.json({
                "status": 500,
                "message": "Internal Server Error"
              });
            } else {
              res.json({
                "status": "ok1",
                "message": "bot is down"
              });
            }
          });
        }else{
          res.json({
            "status": "ok2",
            "message": "bot is active"
          });
        }
        let params_update2 =[req.params.bot_id];
        let query_cmd_update2 = "UPDATE ea set last_check = now() WHERE bot_id = ?";
        query(mysql.format(query_cmd_update2, params_update2));
      }
    });
  },
  sendEmail: function(req, res){
  //const sendmail = require('sendmail')();
  let from = req.body.from;
  let sender = req.body.sender;
  let to = req.body.to;
  let cc = req.body.cc;
  let bcc = req.body.bcc;
  let replyTo = req.body.replyTo;
  let inReplyTo = req.body.inReplyTo;
  let subject = req.body.subject;
  let html = req.body.html;
  console.log(from+ " - "+ to +" - "+ html);
  const sendmail = require('sendmail')({
    logger: {
      debug: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error
    },
    silent: false
    //,devPort: 1025, // Default: False 
    //devHost: 'localhost' // Default: localhost 
  })
  sendmail({
      from: from,
      sender: sender,
      to: to,
      cc: cc,
      bcc: bcc,
      replyTo: replyTo,
      inReplyTo: inReplyTo,
      subject: subject,
      html: html,
    }, function(err, reply) {
      console.log(err && err.stack);
      console.dir(reply);
  });
  }
};
module.exports = user_services;