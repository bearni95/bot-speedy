intents.push({
    slug : 'googler',
    entities : ['who', 'who is'],
    reply : {
        _get : function (url){
            return new Promise(function(then, error){
                $.ajax({
                    url : url, 
                    method : 'GET',
                }).done(function(result){
                    then(result);
                }).fail(function(e){
                    error(e);
                })
            })
        },

        _parse : function (str){
            var dom = $.parseHTML(str);
            var base = $(dom);

            var bold_result;
            var box_result;

            var results = [];
            try{ 
                base.find('#ires').find('b').each(function(){
                    results.push($(this).text().trim())
                })
            } catch (e){
            }

            try{results.push( base.find('#rhs_block').text().split('Played by:')[1].split(',')[0].trim() );} catch (e){}
            try{results.push( base.find('#rhs_block').text().split('Portrayed by:')[1].split('Date')[0].trim() );} catch (e){}
            try{results.push( base.find('._XWk')[0].innerText.trim() );} catch (e){}
            
            for (var i = 0; i < results.length; i++){
                var result = results[i];
                if (result.charAt(0) != result.charAt(0).toUpperCase()){
                    results.splice(i, 1);
                }

            }

            results.sort(function(a, b){
              // ASC  -> a.length - b.length
              // DESC -> b.length - a.length
              return b.length - a.length;
            });

            return results;
            //console.log(parsed.sentences().out('array'))
        },

        action : function (intent){
            var self = this;
            console.log(intent)
            var entities = brain.parse_sentence(intent.message)
            var replies = intent.reply.params;
            var mood = false //bad mood

            console.log(entities);

            var reply = replies[0];

            var original = intent.message;

            var character = jsUcfirst( original.split(' in ')[0].split(' is ')[1].trim() );
            var show = jsUcfirst( original.split(' in ')[1].trim() );

            /*
            reply = reply.replace('$nouns', JSON.stringify(entities.nouns))
            reply = reply.replace('$verbs', JSON.stringify(entities.verbs))
            reply = reply.replace('$adjectives', JSON.stringify(entities.adjectives))
            reply = reply.replace('$topics', JSON.stringify(entities.topics))

            */


            reply = reply.replace('$character', character)
            reply = reply.replace('$show', show)
            

            chat.send({
                from : 'bot',
                to : 'user',
                content : 'Wait a second please...'
            })


            self._get('https://google.com/search?q=' + encodeURIComponent(intent.message))
            .then(function(html){
                var results = self._parse(html);
                console.log(results);
                reply = reply.replace('$actor', results[0])

                chat.send({
                    from : 'bot',
                    to : 'user',
                    content : reply
                })
            }).catch(function (e){
                console.error(e);
            })


            

        },
        params : ['$character from $show is $actor']
    },
})
/*
var parser = {

    get : function (url){
        return new Promise(function(then, error){
            $.ajax({
                url : url, 
                method : 'GET',
            }).done(function(result){
                then(result);
            }).fail(function(e){
                error(e);
            })
        })

    }
}



$(function(){
    parser.get('http://www.google.com/search?q=who+is+rick+in+rick+and+morty')
    .then(function(html){
        var p = $.parseHTML(html);
        var k = $(p).find('#ires').text()
        console.log(k, p)
        

    }).catch(function (e){
        console.error(e);
    })
})

*/

$(function(){
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
})

function jsUcfirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}