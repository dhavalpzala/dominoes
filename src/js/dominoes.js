(function() {
	var app = angular.module("dominoes", []);
	app.controller("MainController", [ '$scope', function($scope) {
		$scope.indexes = [];
		$scope.list = [];
		$scope.find = function(inputText) {
			var sList = new linkedList(), dataItems = inputText.split(" ");
			for (var index = 0; index < dataItems.length; index++) {
				if (dataItems[index] !== "") {
					sList.add(dataItems[index]);
				}
			}
			for (index = 0; index < 10; index++) {
				var result = sList.getIndexesSeries(index);
				$scope.indexes[index] = result;
			}
			$scope.results = sList.findSeries();
		};
	} ]);
})();