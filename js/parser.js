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

jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

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

