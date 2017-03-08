var brain = {
	intent_error : {
		slug : 'error',
		entities :  ['*'],
		reply : {
            action : function(intent){
                var replies = intent.reply.params;
            	var reply_id = Math.floor(Math.random() * (replies.length)) ;

                chat.send({
                    from : 'bot',
                    to : 'user',
                    content : replies[reply_id],
                })
            },
            params : ['Me no understando', 'Once again, please?'],
        },
	        
	},


	parse_sentence : function (str){
		var parsed = nlp(str)
		var out = {
			nouns : parsed.nouns().out('array'),
	    	verbs : parsed.verbs().out('array'),
	    	adjectives : parsed.adjectives().out('array'),
	    	topics : parsed.topics().data()
	    }

	    return out;
	},


	//intents : [],

	init : function(){
		var self = this;

		/*
		var row = new self.intent_model({
			slug : 'test',
			entities : ['bon dia', 'bona nit'],
			replies : ['suck a dick, dumbshits']
		});
		row.save().then(function(result){
			console.log(result);
		}).catch(function(e){
			console.log(e);
		})
		*/
	},

	find : function (entities){
		var self = this;
		var entity_found = false;

		for (var i = 0; i < intents.length; i++){
			var intent = intents[i];

			for (var j = 0; j < intent.entities.length; j++){
				for (var m = 0; m < entities.length; m++){
					if (intent.entities[j].indexOf(entities[m]) >= 0 && intent.slug != 'error' || intent.entities[j].indexOf('*') >= 0){
						//Entity found
						entity_found = true;

						if (!intent.matching_entities){
							intent.matching_entities = [];
						}

						intent.matching_entities.push(entities[m])


						if (intents[i].entity_count != undefined){
							intents[i].entity_count += 1;
						} else {
							intents[i].entity_count = 1;
						}
					} 
				}
				
			}
		}

		if (entity_found){
			intents = intents.sort(function (a, b){
				if (!a.entity_count){
					return 1;
				}

				if (!b.entity_count){
					return -1;
				}
				if (a.entity_count < b.entity_count){
					return 1;
				} else if (a.entity_count > b.entity_count){
					return -1;
				} else {
					return 0;
				}
			})


			return intents[0];
		} else {
			return self.intent_error;
		}
	},
}