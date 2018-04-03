/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('knobCtrl', knobCtrl);

  /** @ngInject */
  function knobCtrl($scope, $state, $timeout, pageService, $filter, $uibModal,dialogModal) {

    //creating Join Employee  grids
    $scope.joinGridOpt = $scope.getGridSetting();
    $scope.joinGridOpt.columnDefs = []
    $scope.joinGridOpt.columnDefs.push({ name: 'Sno', displayName: 'S.No', Width: '5x' })
    $scope.joinGridOpt.columnDefs.push({ name: 'EmpId', displayName: 'Emp Id', Width: '5px' })
    $scope.joinGridOpt.columnDefs.push({ name: 'EmpName', displayName: 'Name' })
    $scope.joinGridOpt.columnDefs.push({ name: 'DeptName', displayName: 'Department' })
    $scope.joinGridOpt.columnDefs.push({ name: 'JDDate', displayName: 'Joining' })
    $scope.joinGridOpt.data = [];


    //creating Employee Left  grids
    $scope.LeftGridOpt = $scope.getGridSetting();
    $scope.LeftGridOpt.columnDefs = []
    $scope.LeftGridOpt.columnDefs.push({ name: 'Sno', displayName: 'S.No', Width: '5x' })
    $scope.LeftGridOpt.columnDefs.push({ name: 'EmpId', displayName: 'Emp Id', Width: '5px' })
    $scope.LeftGridOpt.columnDefs.push({ name: 'EmpName', displayName: 'Name' })
    $scope.LeftGridOpt.columnDefs.push({ name: 'DeptName', displayName: 'Department' })
    $scope.LeftGridOpt.columnDefs.push({ name: 'JDHasLeftDate', displayName: 'Left' })
    $scope.LeftGridOpt.data = [];


    //creating Employee Leave Today  grids
    $scope.LeaveTodayGridOpt = $scope.getGridSetting();
    $scope.LeaveTodayGridOpt.columnDefs = []
    $scope.LeaveTodayGridOpt.columnDefs.push({ name: 'Sno', displayName: 'S.No', Width: '5x' })
    $scope.LeaveTodayGridOpt.columnDefs.push({ name: 'EmpId', displayName: 'Emp Id', Width: '5px' })
    $scope.LeaveTodayGridOpt.columnDefs.push({ name: 'EmpName', displayName: 'Name' })
    $scope.LeaveTodayGridOpt.columnDefs.push({ name: 'DeptName', displayName: 'Department' })
    $scope.LeaveTodayGridOpt.columnDefs.push({ name: 'ELSDSanctionFromDate', displayName: 'Leave' })
    $scope.LeaveTodayGridOpt.data = [];


    //creating Employee Leave Next 7 days  grids
    $scope.LeaveNextWeekGridOpt = $scope.getGridSetting();
    $scope.LeaveNextWeekGridOpt.columnDefs = []
    $scope.LeaveNextWeekGridOpt.columnDefs.push({ name: 'Sno', displayName: 'S.No', Width: '5x' })
    $scope.LeaveNextWeekGridOpt.columnDefs.push({ name: 'EmpId', displayName: 'Emp Id', Width: '5px' })
    $scope.LeaveNextWeekGridOpt.columnDefs.push({ name: 'EmpName', displayName: 'Name' })
    $scope.LeaveNextWeekGridOpt.columnDefs.push({ name: 'DeptName', displayName: 'Department' })
    $scope.LeaveNextWeekGridOpt.columnDefs.push({ name: 'ELSDSanctionFromDate', displayName: 'Leave' })
    $scope.LeaveNextWeekGridOpt.data = [];

    //creating Employee  Today Birthday grids
    $scope.BirthdayTodayGridOpt = $scope.getGridSetting();
    $scope.BirthdayTodayGridOpt.columnDefs = []
    $scope.BirthdayTodayGridOpt.columnDefs.push({ name: 'Sno', displayName: 'S.No', Width: '5x' })
    $scope.BirthdayTodayGridOpt.columnDefs.push({ name: 'EmpId', displayName: 'Emp Id', Width: '5px' })
    $scope.BirthdayTodayGridOpt.columnDefs.push({ name: 'EmpName', displayName: 'Name' })
    $scope.BirthdayTodayGridOpt.columnDefs.push({ name: 'DeptName', displayName: 'Department' })
    //  $scope.BirthdayTodayGridOpt.columnDefs.push({  name: 'DateOfBirth', displayName: 'Birthday  Date' })
    $scope.BirthdayTodayGridOpt.data = [];


    //creating Employee Birthday Next 7 days  grids
    $scope.BirthdayNextWeekGridOpt = $scope.getGridSetting();
    $scope.BirthdayNextWeekGridOpt.columnDefs = []
    $scope.BirthdayNextWeekGridOpt.columnDefs.push({ name: 'Sno', displayName: 'S.No', Width: '5x' })
    $scope.BirthdayNextWeekGridOpt.columnDefs.push({ name: 'EmpId', displayName: 'Emp Id', Width: '5px' })
    $scope.BirthdayNextWeekGridOpt.columnDefs.push({ name: 'EmpName', displayName: 'Name' })
    $scope.BirthdayNextWeekGridOpt.columnDefs.push({ name: 'DeptName', displayName: 'Department' })
    $scope.BirthdayNextWeekGridOpt.columnDefs.push({ name: 'DateOfBirth', displayName: 'Date' })
    $scope.BirthdayNextWeekGridOpt.data = [];

    //creating Holiday  Next 7 days  grids
    $scope.HolidayNextWeekGridOpt = $scope.getGridSetting();
    $scope.HolidayNextWeekGridOpt.columnDefs = []
    $scope.HolidayNextWeekGridOpt.columnDefs.push({ name: 'Sno', displayName: 'S.No', Width: '5x' })
    $scope.HolidayNextWeekGridOpt.columnDefs.push({ name: 'HDName', displayName: 'Holiday-Name', Width: '5px' })
    $scope.HolidayNextWeekGridOpt.columnDefs.push({ name: 'HDFromDate', displayName: 'From-Day' })
    $scope.HolidayNextWeekGridOpt.columnDefs.push({ name: 'HDToDate', displayName: 'To-Day' })
    $scope.HolidayNextWeekGridOpt.data = [];


//creating Employee  Today Birthday grids
$scope.AbsentlistGrid = $scope.getGridSetting();
$scope.AbsentlistGrid.columnDefs = []
$scope.AbsentlistGrid.columnDefs.push({ name: 'Sno', displayName: 'S.No', Width: '5x' })
$scope.AbsentlistGrid.columnDefs.push({ name: 'EmpId', displayName: 'Emp Id', Width: '5px' })
$scope.AbsentlistGrid.columnDefs.push({ name: 'EmpName', displayName: 'Name' })
$scope.AbsentlistGrid.columnDefs.push({ name: 'DeptName', displayName: 'Department' })
//  $scope.BirthdayTodayGridOpt.columnDefs.push({  name: 'DateOfBirth', displayName: 'Birthday  Date' })
$scope.AbsentlistGrid.data = [];

    

//creating Employee  Today Present grids
$scope.PresentlistGrid = $scope.getGridSetting();
$scope.PresentlistGrid.columnDefs = []
$scope.PresentlistGrid.columnDefs.push({ name: 'Sno', displayName: 'S.No', Width: '5x' })
$scope.PresentlistGrid.columnDefs.push({ name: 'EmpId', displayName: 'Emp Id', Width: '5px' })
$scope.PresentlistGrid.columnDefs.push({ name: 'EmpName', displayName: 'Name' })
$scope.PresentlistGrid.columnDefs.push({ name: 'DeptName', displayName: 'Department' })
$scope.PresentlistGrid.columnDefs.push({ name: 'loginInTime', displayName: 'InTime' })
$scope.PresentlistGrid.columnDefs.push({ name: 'loginOutTime', displayName: 'OutTime' })


//  $scope.BirthdayTodayGridOpt.columnDefs.push({  name: 'DateOfBirth', displayName: 'Birthday  Date' })
$scope.PresentlistGrid.data = [];





    var queryId = 577;
    var empDashBoardQueryId = 587;
    var sktest = 100
    $scope.onChange = _onChange;
    $scope.listAbsent = _listAbsent;
    $scope.listPresent = _listPresent;
    $scope.listLeave = _listLeave;
    
    // $scope.value = 100;
    // $scope.valuennew = 50;


    $scope.IsVisible = false;
    $scope.ShowHide = function () {
      //If DIV is visible it will be hidden and vice versa.
      $scope.IsVisible = $scope.IsVisible ? false : true;
    }

    $scope.totalActiveEmp = {
      startAngle: 30,
      endAngle: 330,
      unit: '',
      // trackColor: "rgba(162,121,143,1)",
      // barColor: 'rgba(102,0,204,.5)',

      trackColor: "rgba(162,121,143,1)",
      barColor: 'rgba(102,0,204,.5)',

      trackWidth: 15,
      barWidth: 15,
      subText: {
        enabled: true,
        text: 'Total Employee'
      },
      max: 1024
    };



    $scope.totalPresent = {
      skin: {
        type: 'tron'
      },
      size: 200,
      unit: "%",
      barWidth: 30,
      trackColor: 'rgba(255,0,0,.1)',
      prevBarColor: 'rgba(0,0,0,.2)',
      subText: {
        enabled: true,
        text: 'Total Present'
      },
      scale: {
        enabled: true,
        type: 'lines',
        width: 2
      },
      step: 5,
      displayPrevious: true
    };

    $scope.totalPresentCount = {
      unit: "",
      readOnly: true,
      subText: {
        enabled: true,
        text: 'Total Present',
        color: 'gray',
        font: 'auto'
      },
      trackWidth: 40,
      barWidth: 25,
      // trackColor: '#656D7F',
      // barColor: '#2CC185'

      trackColor: 'rgba(52,152,219,.1)',
      barColor: 'rgba(52,152,219,.5)'
    };




    $scope.totalAbsent = {
      skin: {
        type: 'tron'
      },
      size: 200,
      unit: "%",
      barWidth: 30,
      trackColor: 'rgba(0,128,0, 0.1)',
      prevBarColor: 'rgba(0,0,255,0.3)',
      subText: {
        enabled: true,
        text: 'Total Absent'
      },
      scale: {
        enabled: true,
        type: 'lines',
        width: 2
      },
      step: 5,
      displayPrevious: true
    };



    $scope.totalAbsentCount = {
      unit: "",
      readOnly: true,
      subText: {
        enabled: true,
        text: 'Total Absent',
        color: 'gray',
        font: 'auto'
      },
      trackWidth: 40,
      barWidth: 25,
      trackColor: '#656D7F',
      barColor: '#2CC185'
    };

    $scope.totalLeaveToday = {
      unit: "%",
      readOnly: true,
      subText: {
        enabled: true,
        text: 'Total on Leave',
        color: 'gray',
        font: 'auto'
      },
      trackWidth: 40,
      barWidth: 25,
      trackColor: '#656D7F',
      barColor: '#2CC185'
    };


    $scope.totalLeaveTodayCount = {
      unit: "",
      readOnly: true,
      subText: {
        enabled: true,
        text: 'Total on Leave',
        color: 'gray',
        font: 'auto'
      },
      trackWidth: 40,
      barWidth: 25,
      // trackColor: '#656D7F',
      // barColor: '#2CC185'

      trackColor: 'rgba(33,33,33,.2)',
      barColor: 'rgba(255,221,51,1)'

    };



    function _loadController() {
      if ($scope.user.profile.isAdmin && $scope.user.profile.isManager) {

        $scope.adminDashboard = true;
        var searchLists = [];
        var searchListData = {
          field: 'SubUnit',
          operand: '=',
          value: 1
        }
        searchLists.push(searchListData)
        var searchListData = {
          field: 'Deparmtent',
          operand: '=',
          value: 1
        }
        searchLists.push(searchListData)

        var data = {
          searchList: searchLists,
          orderByList: []
        }
        pageService.getCustomQuery(data, queryId).then(_getCustomQuerySuccess, _getCustomQueryError)
      }
      else {

        $scope.filterBy = [{ id: 1, name: 'Self' }, { id: 2, name: 'All' }]
        $scope.adminDashboard = false;
        $scope.leaveOption = $scope.getGridSetting();
        $scope.leaveOption.columnDefs = []
        $scope.leaveOption.columnDefs.push({ name: 'EmpCode', displayName: 'EmpCode' })
        $scope.leaveOption.columnDefs.push({ name: 'EmpName', displayName: 'Name' })
        $scope.leaveOption.columnDefs.push({ name: 'TotalLeave', displayName: 'Total Leave' })
        $scope.leaveOption.columnDefs.push({ name: 'FromDate', displayName: 'From  Date' })
        $scope.leaveOption.columnDefs.push({ name: 'ToDate', displayName: 'To  Date' })
        $scope.leaveOption.data = [];

        $scope.holidayOption = $scope.getGridSetting();
        $scope.holidayOption.columnDefs = []
        $scope.holidayOption.columnDefs.push({ name: 'HDName', displayName: 'Holiday Name' })
        $scope.holidayOption.columnDefs.push({ name: 'HDFromDate', displayName: 'Date' })
        $scope.holidayOption.columnDefs.push({ name: 'DayName', displayName: 'Day Name' })
        $scope.holidayOption.data = [];

        $scope.birthdayOption = $scope.getGridSetting();
        $scope.birthdayOption.columnDefs = []
        $scope.birthdayOption.columnDefs.push({ name: 'EmpCode', displayName: 'EmpCode' })
        $scope.birthdayOption.columnDefs.push({ name: 'EmpName', displayName: 'Name' })
        $scope.birthdayOption.columnDefs.push({ name: 'PdDateOfBirth', displayName: 'DOB' })
        $scope.birthdayOption.columnDefs.push({ name: 'DayName', displayName: 'Day' })
        $scope.birthdayOption.data = [];

        var searchLists = [];
        var searchListData = {
          field: 'EmpId',
          operand: '=',
          value: $scope.user.profile.empId
        }
        searchLists.push(searchListData)
        var searchListData = {
          field: 'DepartmentId',
          operand: '=',
          value: $scope.user.profile.deptId != undefined ? $scope.user.profile.deptId : 0
        }
        searchLists.push(searchListData)
        var searchListData = {
          field: 'SubUnitId',
          operand: '=',
          value: $scope.user.profile.suId != undefined ? $scope.user.profile.suId : 0
        }
        searchLists.push(searchListData)

        var data = {
          searchList: searchLists,
          orderByList: []
        }
        pageService.getCustomQuery(data, empDashBoardQueryId).then(_getEmpDashboardQuerySuccess, _getEmpDashboardQueryError)
      }
    }

    function _getCustomQuerySuccess(result) {
      console.log(result);
      var totalemployee = result[0][0].TotalActiveEmployee

      $scope.totalActiveEmpValue = result[0][0].TotalActiveEmployee;
      $scope.totalPresentValuePercentage = result[1][0].TotalPresent;
      $scope.totalPresentValueCount = result[1][0].totPr;
      $scope.totalAbsentValuePercentage = result[2][0].TotalAbsentEmployee;
      $scope.totalAbsentValuePercentageCount = result[2][0].totabs;
      $scope.totalLeaveTodayValuePercentage = result[3][0].TotalLeaveToday;
      $scope.totalLeaveTodayValuePercentageCount = result[3][0].totLeave;
      $scope.TotalNewJoin = result[4][0].TotalNewJoinlastsixmonth;
      $scope.TotalNewJoinList = result[5];
      $scope.TotalLeftlastsixmonth = result[6][0].TotalLeftlastsixmonth;
      $scope.TotalNewLeftList = result[7];
      $scope.TodayonLeaveEmployee = result[8];
      $scope.Next7daysonLeaveEmployee = result[9];
      $scope.Next7Hodidays = result[10];
      $scope.TodayBirthday = result[11];
      $scope.Next7daysonBirthdayEmployee = result[5];
      $scope.absentlist = result[13];
      $scope.presentlist = result[14];
      $scope.joinGridOpt.data = $scope.TotalNewJoinList;
      $scope.LeftGridOpt.data = $scope.TotalNewLeftList;
      $scope.LeaveTodayGridOpt.data = $scope.TodayonLeaveEmployee;
      $scope.LeaveNextWeekGridOpt.data = $scope.Next7daysonLeaveEmployee;
      $scope.BirthdayTodayGridOpt = $scope.TodayBirthday;
      $scope.BirthdayNextWeekGridOpt = $scope.Next7daysonBirthdayEmployee;
      $scope.HolidayNextWeekGridOpt = $scope.Next7Hodidays;
      $scope.AbsentlistGrid.data = $scope.absentlist;
      $scope.PresentlistGrid.data = $scope.presentlist;



      // angular.forEach($scope.TotalNewJoinList, function (data) {
      //   data.JDDate = moment(data.JDDate).format("DD/MM/YYYY");
      // })

      // angular.forEach($scope.TotalNewLeftList,function (data) {
      //   data.JDHasLeftDate= moment(data.JDHasLeftDate).format("DD/MM/YYYY")
      // })

      // angular.forEach($scope.TotalNewLeftList,function (data) {
      //   data.JDHasLeftDate= moment(data.JDHasLeftDate).format("DD/MMM/YYYY")
      // })




    }
    function _getCustomQueryError(err) {
      console.log(err);
    }

    function _listAbsent() {
     
      var options = {
        url: "app/pages/dashboard/absentmodal.html",
        controller: "",
        controllerAs: "",
      }
      dialogModal.open(options)


    }

    function _listPresent() {
     
      var options = {
        url: "app/pages/dashboard/presentmodal.html",
        controller: "",
        controllerAs: "",
      }
      dialogModal.open(options)


    }


    function _listLeave() {
     
      var options = {
        url: "app/pages/dashboard/leavemodal.html",
        controller: "",
        controllerAs: "",
      }
      dialogModal.open(options)


    }

    

    


    function _getEmpDashboardQuerySuccess(result) {
      console.log(result)

      if (result != 'NoDataFound') {
        $scope.leaveList = result[0];

        if (result[1].length > 0) {
          angular.forEach(result[1], function (data) {
            data.HDFromDate = moment(data.HDFromDate).format('DD/MMM/YYYY');
          })

          $scope.holidayOption.data = result[1];
        }
        $scope.birthdayOption.data = result[2]
        var selfEmp = $filter('findAll')(result[0], $scope.user.profile.empId, 'EmpId');
        if (selfEmp != null) {
          angular.forEach(selfEmp, function (data) {
            data.FromDate = moment(data.FromDate).format('DD/MMM/YYYY');
            data.ToDate = moment(data.ToDate).format('DD/MMM/YYYY');
          })

          $scope.leaveOption.data = selfEmp;

        }
      }
      else {
        $scope.showMsg('error', "No Data Found");
      }
    }
    function _getEmpDashboardQueryError(err) {

    }
    function _onChange(id) {
      if ($scope.leaveList != undefined) {
        if (id == 1) {
          var selfEmp = $filter('findAll')($scope.leaveList, $scope.user.profile.empId, 'EmpId');
          if (selfEmp != null) {
            angular.forEach(selfEmp, function (data) {
              data.FromDate = moment(data.FromDate).format('DD/MMM/YYYY');
              data.ToDate = moment(data.ToDate).format('DD/MMM/YYYY');
            })
            $scope.leaveOption.data = selfEmp;
          }
        }
        else {
          angular.forEach($scope.leaveList, function (data) {
            data.FromDate = moment(data.FromDate).format('DD/MMM/YYYY');
            data.ToDate = moment(data.ToDate).format('DD/MMM/YYYY');
          })
          $scope.leaveOption.data = $scope.leaveList;
        }
      }
    }
    _loadController();
  }

})();

