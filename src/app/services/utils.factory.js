(function() {
  'use strict';

  angular
    .module('crmApp')
    .factory('utils', utils);

  /** @ngInject */
  function utils($ionicHistory, $ionicPopup, $log) {
		return {
			getLocationSearch: function() {
				var query_string = {};
				  var query = window.location.search.substring(1);
				  var vars = query.split("&");
				  for (var i=0;i<vars.length;i++) {
				    var pair = vars[i].split("=");
				        // If first entry with this name
				    if (typeof query_string[pair[0]] === "undefined") {
				      query_string[pair[0]] = decodeURIComponent(pair[1]);
				        // If second entry with this name
				    } else if (typeof query_string[pair[0]] === "string") {
				      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
				      query_string[pair[0]] = arr;
				        // If third or later entry with this name
				    } else {
				      query_string[pair[0]].push(decodeURIComponent(pair[1]));
				    }
				  }

			    return query_string;
			},
			param: function(obj) {
				var str = [];
        for(var p in obj) {
        	str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        
        return str.join("&");
			},
			disableBack: function() {
				$ionicHistory.nextViewOptions({
				  disableAnimate: false,
				  disableBack: true
				});
			},
			goBack: function(depth) {
				$ionicHistory.goBack(depth);
			},
			alert: function(obj) {
				var alertPopup = $ionicPopup.alert({
				  title: obj.title || '温馨提示',
				  cssClass: obj.cssClass || 'text-center',
				  subTitle: obj.subTitle || '',
				  template: obj.content || '',
				  templateUrl: obj.contentUrl || '',
				  okText: obj.okText || '确认',
				  okType: obj.okType || 'button-balanced'
				});
				alertPopup.then(function(res) {
					obj.callback && obj.callback();
				});
			},
			confirm: function(obj) {
				var confirmPopup = $ionicPopup.confirm({
				  title: obj.title || '温馨提示',
				  template: obj.content || '',
				  cssClass: obj.cssClass || 'text-center',
				  okText: obj.okText || '确认',
				  okType: obj.okType || 'button-balanced',
				  cancelText: obj.cancelText || '取消'
				});
				confirmPopup.then(function(res) {
					if(res) {
						obj.onOk && obj.onOk();
					} else {
						obj.onCancel && obj.onCancel();
					}
				});
			}
		}
  }

})();