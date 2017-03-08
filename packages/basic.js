var intents = []
/*

intents.push({
    slug : 'basic-interaction',
    //entities : ['hi', 'hey', 'hello', 'how', 'are', 'howdy'],
    entities : [
        {
            entity : 'hi, nice to meet you',
            keys : ['hi', 'nice to meet you'],
        }, 
        {
            entity : 'hey there',
            keys : ['hey', 'hey there'],
        },
        {
            entity : 'good morning',
            keys : ['good morning']
        }
    ],
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
        reactions : [{
            text : 'Hi there! I\'m Robbie, nice to meet you :)',
            state : 'all',
        },]
        params : ['Hi there! I\'m Robbie, nice to meet you :)', 'This is Robbie, nice to meet you'],
    },
})
*/
/*
intents.push({
    slug : 'basic-interaction',
    entities : ['hi', 'hey', 'hello', 'how', 'are', 'howdy'],

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
        params : ['Hi there! I\'m Robbie, nice to meet you :)', 'This is Robbie, nice to meet you'],
    },
})

intents.push({
    slug : 'goodbye',
    entities : ['bye', 'see you', 'good bye', 'goodbye'],
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
        params : ['See you!', 'It\'s been nice, be back soon :)'],
    },
})

intents.push({
    slug : 'recognition',
    entities : ['i am', 'i\'m', 'my name is'],
    reply : {
        action : function (intent){
            var message = intent.message_entities;
            var entities = intent.matching_entities;

            var possible_names = []

            for (var i = 0; i < message.length; i++){
                if (entities.indexOf(message[i]) < 0){
                    possible_names.push(message[i])
                }
            }

            var reply = '';
            var replies = intent.reply.params;
            var reply_id = Math.floor(Math.random() * (replies.length)) ;

            if (possible_names.length === 1){
                reply = replies[reply_id].replace('$name', possible_names[0])
            }

            chat.send({
                from : 'bot',
                to : 'user',
                content : reply
            })
        },
        params : ['Cool. I can recognize you as a person, $name', 'Great! Nice to meet you $name']
    }
})

intents.push({
    slug : 'mood-recognizer',
    entities : ['thanks', 'thank you', 'arse', 'ass', 'asshole', 'bastard', 'bitch', 'bollocks', 'child-fucker', 'crap', 'cunt', 'damn', 'fuck', 'goddamn', 'godsdamn', 'hell', 'holy shit', 'motherfucker', 'nigga', 'nigger', 'shit', 'shit ass', 'shitass', 'son of a bitch', 'twat'],
    reply : {
        action : function (intent){
            console.log(intent)
            var entities = intent.matching_entities;
            var replies = intent.reply.params;
            var mood = false //bad mood

            if (entities.indexOf('thanks') >= 0 || entities.indexOf('thank you') >= 0){
                //User's in a good mood
                mood = true;
            }

            var reply_id = Math.floor(Math.random() * (replies.length));

            if (reply_id % 2 === 1 && mood || reply_id % 2 === 0 && !mood){
                reply_id = (reply_id + 1) % replies.length;
            } 

            chat.send({
                from : 'bot',
                to : 'user',
                content : replies[reply_id]
            })
        },
        params : ['That was nice, thanks for sharing', 'Well then go fuck yourself. Don\'t be moody at me', 'How kind, thanks buddy', 'Suck a dick, dumbshit. You\'re being quite mean']
    },

    
})*/

intents.push({
    slug : 'basic-interaction',
    entities : ['hi', 'hey', 'hello', 'how', 'are', 'howdy'],

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
        params : ['SPD13 at your service', 'You can call me Speedy'],
    },
})

intents.push({
    slug : 'goodbye',
    entities : ['bye', 'see you', 'good bye', 'goodbye'],
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
        params : ['Suck a dick, dumbshit', 'It\'s been nice, be back soon :)'],
    },
})


intents.push({
    slug : 'nlp',
    entities : ['---'],
    reply : {
        action : function (intent){
            console.log(intent)
            var entities = brain.parse_sentence(intent.message)
            var replies = intent.reply.params;
            var mood = false //bad mood

            console.log(entities);

            var reply = replies[0];

            reply = reply.replace('$nouns', JSON.stringify(entities.nouns))
            reply = reply.replace('$verbs', JSON.stringify(entities.verbs))
            reply = reply.replace('$adjectives', JSON.stringify(entities.adjectives))
            reply = reply.replace('$topics', JSON.stringify(entities.topics))

            chat.send({
                from : 'bot',
                to : 'user',
                content : reply
            })
        },
        params : ['Nouns:$nouns <br> Verbs:$verbs <br> Adjectives:$adjectives <br> Topics:$topics']
    },
})

