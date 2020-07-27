(function () {
    'use strict';

    angular
        .module('app')
        .controller('importExportResxController', importExportResxController);
    importExportResxController.$inject = ['$scope','localizationService'];

    function importExportResxController($scope, localizationService) {        
        var vm = this;
        vm.resources = resources;
        vm.dbRes = resources.dbRes;
        vm.resourceSets = null;
        vm.selectedResourceSets = [];

        vm.parentView = $scope.$parent.view;

        vm.info = null;        
        vm.importExportType = "Export";        
        vm.onSubmitClick = function () {
            
            if (vm.importExportType === "Export")
                vm.exportResources();
            if (vm.importExportType === "Import")
                vm.importResources();
        };

        vm.exportResources = function () {
            if (vm.selectedResourceSets && vm.selectedResourceSets.length == 1 && !vm.selectedResourceSets[0])
                vm.selectedResourceSets = null;

            localizationService.exportResxResources(vm.info.ResxBaseFolder, vm.selectedResourceSets)
                .then(function() {
                    $("#ImportExportResxDialog").modal('hide');
                    vm.parentView.showMessage(vm.dbRes("ResxResourcesHaveBeenCreated"));
                })
                .catch(vm.parentView.parseError);
        };

        vm.importResources = function() {
            localizationService.importResxResources(vm.info.ResxBaseFolder)
                .then(function() {
                    $("#ImportExportResxDialog").modal('hide');                    
                    vm.parentView.showMessage(vm.dbRes("ResxResourcesHaveBeenImported"));
                    vm.parentView.getResourceSets();
                })
                .catch(vm.parentView.parseError);
        };

        initialize();

        function initialize() {
            localizationService.getLocalizationInfo()
                .then(function(pi) {
                    vm.info = pi.data;
                })
                .catch(vm.parentView.parseError);

            setTimeout(function () {
                vm.resourceSets = localizationService.resourceSets;
                vm.selectedResourceSets = [""];
            }, 20);
        }
    }
})();;