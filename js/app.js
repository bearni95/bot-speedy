/*
global.readline = require('readline');
global.prompt = require('prompt');
global.mongoose = require('mongoose') 
require('mongoose-function')(mongoose);
global.fs = require('fs');

var EventEmitter = require('events').EventEmitter;
global.events = new EventEmitter();

global.event_listeners = require('./lib/listeners.js')

global.brain = require('./lib/brain.js');
global.bot = require('./lib/bot.js');

bot.init();

bot.ask();

*/

$(function(){
    app.init();
})

var app = {
    init : function(){
        bot.init();
    }
}

$(function(){
    var result = brain.parse_sentence('Good morning sir, how\'s the weather like today?')
    console.log(result)
})