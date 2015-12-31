(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('InvitationController', InvitationController);

  /** @ngInject */
  function InvitationController($state, $stateParams, $rootScope, $ionicActionSheet, ApiService, UserService, utils, RightsApplyService) {
    var vm = this, 
        id = $stateParams.id,
        userId = UserService.getUserId(),
        applyRoles = [{ text: '经销商', id: 0 }, { text: '小店', id: 1 }],
        statusList = [{ text: '已邀约', id: 0 }, { text: '已到访', id: 1 }],
        monthList = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];

    vm.title = !id ? '添加邀约' : '邀约详情';

    vm.datepickerObject = {
      titleLabel: '预计到访日期',  //Optional
      todayLabel: '今天',  //Optional
      closeLabel: '关闭',  //Optional
      setLabel: '选定',  //Optional
      setButtonType : 'button-balanced',  //Optional
      todayButtonType : 'button-balanced',  //Optional
      closeButtonType : 'button-balanced',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: false,  //Optional
      // disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList, //Optional
      monthList: monthList, //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'false', //Optional
      modalHeaderColor: 'bar-balanced', //Optional
      modalFooterColor: 'bar-balanced', //Optional
      from: new Date(), //Optional
      to: new Date(2016, 12, 25),  //Optional
      callback: function (val) {  //Mandatory
        datePickerCallback(val);
      },
      dateFormat: 'yyyy-MM-dd', //Optional
      closeOnSelect: true, //Optional
    };

    // public functions
    vm.save = save;
    vm.showApplyRoleAction = showApplyRoleAction;
    vm.showStatusAction = showStatusAction;
    vm.applyRights = applyRights;

    init();

    function datePickerCallback(val) {
      if(val) {
        vm.datepickerObject.inputDate = val;
        vm.info.visitDate = moment(val).format('YYYY-MM-DD');
      }
    }

    function showApplyRoleAction() {
      var applyRoleAction = $ionicActionSheet.show({
        buttons: applyRoles,
        // destructiveText: 'Delete',
        titleText: '选择申请角色',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          vm.info.applyRole = applyRoles[index];
          return true;
        }
      });
    }

    function showStatusAction() {
      var statusAction = $ionicActionSheet.show({
        buttons: statusList,
        // destructiveText: 'Delete',
        titleText: '选择用户状态',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          vm.info.status = statusList[index];
          return true;
        }
      });
    }

    function init() {
      if(id) {
        ApiService.invitation({id: id}).success(function(data) {
          if(data.flag === 1) {
            var result = data.data.result;

            vm.info = {
              id: id,
              name: result.inviteuserName,
              phone: result.inviteuserMobile,
              visitDate: result.visitTime,
              applyRole: {
                id: result.applyRole
              },
              status: {
                id: result.userState
              },
              remark: result.remark,
              msgId: result.msgid,
              applied: !!result.nextStep
            };
          } else {
            $log.error('get invitation error');
          }
        })
      } else {
        vm.info = {
          applyRole: applyRoles[0],
          status: statusList[0]
        };
      }
    }


    function save() {
      if(id) { // update
        vm.info.id = id;
        vm.info.userId = userId;
        ApiService.updateInvitation(vm.info).success(function(data) {
          if(data.flag === 1) {
            $rootScope.$broadcast('reload:invitation:list');
            utils.goBack();
          } else {
            $log.error('update invitation error');
          }
        });
      } else { // add
        vm.info.userId = userId;
        ApiService.addInvitation(vm.info).success(function(data) {
          if(data.flag === 1) {
            $rootScope.$broadcast('reload:invitation:list');
            utils.goBack();
          } else {
            $log.error('add invitation error');
          }
        });
      }
    }

    function applyRights() {
      var applyTypeId = vm.info.applyRole.id;

      RightsApplyService.reset();

      RightsApplyService.setApplyType(applyTypeId);

      RightsApplyService.info.realname = vm.info.name;
      RightsApplyService.info.phone = vm.info.phone;
      RightsApplyService.info.msgId = vm.info.msgId;

      $state.go('rights:add');
    }

  }
})();
