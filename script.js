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
				requiredVersion: '2.0'
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

		var storedItems = localStorage.getItem(res.name),
			storedItemsVersion = localStorage.getItem(res.name + '-v');

		if (storedItems && storedItemsVersion === res.requiredVersion) {
			try {
				items = JSON.parse(storedItems);
			} catch (e) {}
		}

		function getItems(){
			var defer = $q.defer();

			if (items.length) {
				defer.resolve(items);
			} else {
				$http({
					method: 'get',
					url: res.url
				}).then(function(response){
					defer.resolve(response.data);

					localStorage.setItem(res.name, JSON.stringify(response.data));
					localStorage.setItem(res.name + '-v', res.requiredVersion);
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