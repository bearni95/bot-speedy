events.on('bot-basic-interaction', function (intent){
    bot.onReply(intent);
    bot.ask();
})

events.on('bot-error', function (intent){
    bot.onReply(intent);
    bot.ask();
})

events.on('bot-goodbye', function (intent){
	bot.onReply(intent);
	process.exit()
})

events.on('*', function (all){
	console.warn(all);
})

events.on('bot', function (intent){
	actions.print_reply(intent);

	if (intent.slug === 'quick-learn'){
		actions.quick_learn(intent);
	}

	if (intent.slug === 'goodbye'){
		process.exit();
		return;
	} else {		
		bot.ask();
	}
	
})

var actions = {

	_randint : function(min, max){
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	print_reply : function (intent){
		var self = this;
		var reply = intent.replies[ self._randint(0, intent.replies.length - 1) ]
		console.log(reply);
	},

	quick_learn : function (intent){
		var self = this;
		console.log(bot.conversation);

		var new_concept_msg = bot.conversation[ bot.conversation.length - 1];

		var concepts = new_concept_msg.split('means');
		console.log(concepts)


	}
}