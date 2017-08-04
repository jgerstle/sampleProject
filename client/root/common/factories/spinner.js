angular.module('app.factories').factory('Spinner', spinner);

function spinner($compile, $rootScope) {
	return {
		show: show,
		hide: hide
	}
	function show() {
		var spinner = document.getElementById("spinner");
		if(spinner !== null)
			return;
		spinner = $compile(document.createElement("spinner"))($rootScope.$new())[0];
		spinner.id = 'spinner'
		document.body.appendChild(spinner);
	}
	function hide() {
		spinner = document.getElementById("spinner");
		if(spinner === null) 
			return;
		document.body.removeChild(spinner);
	}
}