(function() {
  'use strict';

  angular
    .module('crmApp')
    .directive('bMap', bMap);

  /** @ngInject */
  function bMap($log, utils, ApiService) {
    var directive = {
      restrict: 'E',
      replace: true,
      template: '<div id="allmap"></div>',
      scope: {
        opened: '=',
        address: '=',
        village: '=',
        validPoint: '=ngModel',
        city: '=',
        district: '=',
        preview: '='
      },
      link: function(scope, element, attr) {
        var stores = scope.opened, 
            address = scope.address, 
            village = scope.village,
            city = scope.city,
            results, // search results
            map, 
            pin;

        function init() {
          map = new BMap.Map("allmap");
          map.centerAndZoom(city, 16);
          map.addControl(new BMap.ZoomControl());  //添加地图缩放控件
        }

        function doSearch() {
          var local = new BMap.LocalSearch(city);

          local.setSearchCompleteCallback(function(data) {
            if(data && data._pois.length) {
              results = data._pois.map(function(obj) {
                var item = obj.point;
                item.name = obj.title;
                item.address = obj.address;
                return item;
              });

              addSearchResults();
            } else {
              utils.alert({
                title: '出错了~',
                content: '输入的地址或小区名无效'
              });
            }
            console.log(results);
          });

          local.search(village || address);
        }

        function addStores() {
          var stores;
          var render = function() {
            var icon = new BMap.Icon('assets/images/pin.png', new BMap.Size(34, 46), {
              anchor: new BMap.Size(17, 46)
            });

            for(var i=0, len=stores&&stores.length; i<len; i++){
              var p = stores[i];
              var marker = new BMap.Marker(new BMap.Point(p.lng, p.lat), {icon: icon});
              map.addOverlay(marker);
            }
          };


          ApiService.getOpenedStores({id: scope.district})
            .success(function(data) {
              if(data.flag === 1) {
                stores = data.data.map(function(obj) {
                  return {
                    lat: obj.latitude,
                    lng: obj.longitude,
                    name: obj.name
                  };
                });

                render();

                $log.debug(stores);
              }
            });
        }

        function addSearchResults() {
          var icon = new BMap.Icon('assets/images/pin-red.png', new BMap.Size(34, 46), {
            anchor: new BMap.Size(17, 46)
          });

          var helper = function(infoWindow, point) {
            return function(e) {
              map.openInfoWindow(infoWindow, point);
              map.panTo(point);

              scope.validPoint = point;

              $log.debug(point);
            };
          };

          for(var i=0, len=results&&results.length; i<len; i++){
            var point = results[i];
            var marker = new BMap.Marker(point, {icon: icon});
            var opts = {
              offset: new BMap.Size(14, -43),
              width : 120,    // 信息窗口宽度
              height: 50,     // 信息窗口高度
              title : point.name, // 信息窗口标题
              enableAutoPan : true //自动平移
            };
            var infoWindow = new BMap.InfoWindow(point.address, opts);  // 创建信息窗口对象
            map.addOverlay(marker);

            marker.addEventListener('click', helper(infoWindow, point));

            if(i===0) {
              helper(infoWindow, point)();
            }
          }
        }

        setTimeout(function() {
          init();
          addStores();

          if(scope.preview) {
            results = [{
              name: scope.village,
              address: scope.address,
              lat: scope.validPoint.lat,
              lng: scope.validPoint.lng
            }];

            // addSearchResults();
          } else {
            doSearch();
          }
        }, 100);
        
      }
    };

    return directive;
  }
})();
