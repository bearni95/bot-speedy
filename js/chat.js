var chat = {
	messages : [],

	init : function (){
		var self = this;

		var messages = self._local_storage('chat-bot');

		if (messages){
			self.messages = JSON.parse(messages);
		} else {
			self.messages = [];
		}

		for (var i = 0; i < self.messages.length; i++){
			self.display_message(self.messages[i])
		}

		$('.chat-text').keypress(function(e){
			var code = (e.keyCode ? e.keyCode : e.which);
  			if(code === 13) { 
				self.send({
					from : 'user',
					to : 'bot',
					content : $(this).val(),
				})

				bot.onQuestion($(this).val())

				$(this).val('')
			}
		})
	},

	send : function (message){
		var self = this;
		
		self.messages.push(message);
		self.display_message(message);
		self._local_storage('chat-bot', JSON.stringify(self.messages));


	},

	display_message : function (message){
		/*
			var message = {
				from : 'bot' / 'user';
				to : 'user' / 'bot',
				message : str,
			}

		*/

		
		var dom = '<div class="message">'
		if (message.from === 'bot' && message.to === 'user'){
			dom += '<div class="message-left">' + message.content + '</div>'
		} else if (message.from === 'user' && message.to === 'bot'){
			dom += '<div class="message-right">' + message.content + '</div>'
		} else {
			console.warn(message);
			return;
		}

		dom += '</div>'

		$('.chat-box').append(dom);

		$('.chat-box').scrollTop(1E10);
	},


	_local_storage : function (key, value){
		//Value must be a string already
		if (value != undefined){
			localStorage.setItem(key, value);
		} else {
			return localStorage[key]
		}
	},
}