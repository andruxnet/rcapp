var _handleResponse = function(response){
	console.log(response);
}

var rcscrapper = function() {

	fetch('https://community.recurse.com') 
	.then(response => response.json())
	.then(json => _handleResponse(json)) 
	.catch(error => console.log('error: ' + error))
;
}


module.exports = rcscrapper;   