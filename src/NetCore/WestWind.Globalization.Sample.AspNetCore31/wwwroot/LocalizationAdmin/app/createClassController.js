(function () {
    'use strict';

    angular
        .module('app')
        .controller('createClassController', createClassController);
    createClassController.$inject = ['$scope','localizationService'];

    function createClassController($scope,localizationService) {        
        var vm = this;
        vm.resources = resources;
        vm.dbRes = resources.dbRes;        
        vm.info = null;
        vm.resourceSets = localizationService.resourceSets;
        vm.selectedResourceSets = [];
        vm.classType = "DbRes";

        vm.parentView = $scope.$parent.view;
        
        initialize();

        function initialize() {
            localizationService.getLocalizationInfo()
                .then(function (pi) {
                    vm.info = pi.data;
                })
                .catch(vm.parentView.parseError);
            setTimeout(function () {
                vm.resourceSets = localizationService.resourceSets;
                vm.selectedResourceSets = [""];
            }, 50);
        }

        vm.onCreateClassClick = function () {
            var file = vm.info.StronglyTypedGlobalResource;
            var ns = vm.info.ResourceBaseNamespace;
            
            localizationService.createClass(file,ns, vm.selectedResourceSets, vm.classType)
                .then(function () {
                    $("#CreateClassDialog").modal('hide');                   
                    vm.parentView.showMessage(vm.dbRes("StronglyTypedClassCreated"));
                })
                .catch(vm.parentView.parseError);
        };
    }
})();;