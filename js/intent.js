var intent = {

	_parse_entities : function (str){
		return str.split(' ');
	},


	resolve : function(str){
		try{
			var self = this;

			var str = str.toLowerCase();

			var entities = self._parse_entities(str);
			var intents = brain.intents;

			var entity_found = false;

			for (var i = 0; i < intents.length; i++){
				var intent = intents[i];

				for (var j = 0; j < intent.entities.length; j++){
					for (var m = 0; m < entities.length; m++){
						if (intent.entities[j].indexOf(entities[m]) >= 0 && intent.slug != 'error'){
							//Entity found
							entity_found = true;
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
				return brain.intent_error;
			}

		} catch (e){
			console.log(e);
		}

	},
}