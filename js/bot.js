var bot = {
	/*
		Structure:
		The most basic learning unit is the entity, a form of variable capturing.
		When many entities and non-entities substrings are put together they make a sentence, which is processed as an intent
		Each intent can then have it's own execution loop with the parsed entities

		The bot needs to structure internally the intents and entities and find the one he is more confident with

		Add self-learning package

	*/

	conversation : [],

	init : function(){
		brain.init();
		chat.init();
	},

	_parse_entities : function (str){
		return str.split(' ');
	},

	onQuestion : function (str){
		var self = this;

		var str = str.toLowerCase();
		var entities = self._parse_entities(str);

		/*
		brain.find(entities).then(function(intent){
			self.conversation.push(str);
			events.emit('bot', intent);
		}).catch(function(e){
			console.log(e);
		})*/

		var intent = brain.find(entities);
		self.build_reply(str, intent);

	},

	ask : function(){
		var self = this;
		prompt.get('>>>', function (e, result){
		    if (e) throw e;
		    self.onQuestion(result['>>>'])
		})
	},

	_randint : function(min, max){
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	build_reply : function (message, intent){
		var self = this;

		//var reply = intent.replies[ self._randint(0, intent.replies.length - 1) ]

		//reply.action(reply.params)
		intent.message = message
		intent.reply.action(intent);
		/*
		if (typeof reply === 'string'){
			chat.send({
				from : 'bot',
				to : 'user',
				content : reply,
			})
		} else {
			//var f = intent.actions[reply.action];
			var entities = self._parse_entities(message);
			var exec_entities = $(entities).not(intent.matching_entities).get()//[];

			console.log(exec_entities);
			brain._exec_reply(intent.actions.success, {
				slug : 'bot-' + intent.slug,
				entities : exec_entities
			})

			chat.send({
				from : 'bot',
				to : 'user',
				content : reply.content,
			})



		}*/
	},



	
}