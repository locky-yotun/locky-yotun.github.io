(function(){
	angular.module('app', []);

})();

(function(){
	angular.module('app').factory('CachableItems', CachableItems);

	CachableItems.$inject = [];

	function CachableItems(){
		return {
			programmingLangs: {
				name: 'programmingLangs',
				url: './back/langs.json',
				requiredVersion: '1.0'
			}
		}
	}
})();

(function(){
	angular.module('app').service('LangsService', LangsService);

	LangsService.$inject = ['CachableItems', '$q', '$http'];

	function LangsService(CachableItems, $q, $http){
		var service = {};

		service.getItems = getItems;

		var res = CachableItems.programmingLangs,
			items = [];

		if (localStorage.getItem(res.name)) {
			try {
				items = JSON.parse(localStorage.getItem(res.name));
			} catch (e) {}
		}

		function getItems(){
			var defer = $q.defer();

			if (items.length) {
				refer.resolve(items);
			} else {
				$http({
					method: 'get',
					url: res.url
				}).then(function(response){
					defer.resolve(response.data);
				}).catch(function(reason){
					defer.reject(reason);
				});
			}

			return defer.promise;
		}

		return service;
	}
})();

(function(){
	angular.module('app').controller('TestController', TestController);

	TestController.$inject = ['LangsService'];

	function TestController(LangsService){
		var vm = this;

		vm.items = [];

		LangsService.getItems().then(function(items){
			vm.items = items;
		});
	}
})();