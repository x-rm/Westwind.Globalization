(function() {
    //'use strict';

    angular
        .module('app')
        .factory('localizationService', localizationService);

    localizationService.$inject = ['$http', '$q', '$timeout'];

    function localizationService($http, $q, $timeout) {
        var service = {
            error: null,
            baseUrl: "../api/LocalizationAdministration/",
            getResourceList: getResourceList,
            getResourceItems: getResourceItems,
            getResourceGridItems: getResourceGridItems,
            getResourceSets: getResourceSets,
            getAllLocaleIds: getAllLocaleIds,
            getResourceStrings: getResourceStrings,
            updateResourceString: updateResourceString,
            updateResource: updateResource,
            updateComment: updateComment,
            deleteResource: deleteResource,
            renameResource: renameResource,
            deleteResourceSet: deleteResourceSet,
            renameResourceSet: renameResourceSet,
            reloadResources: reloadResources,
            isRtl: isRtl,
            fromCamelCase: fromCamelCase,
            backup: backup,
            createTable: createTable,
            createClass: createClass,
            exportResxResources: exportResxResources,
            importResxResources: importResxResources,
            getLocalizationInfo: getLocalizationInfo,
            isLocalizationTable: isLocalizationTable
        };
        return service;

        function getResourceList(resourceSet) {
            return $http.get(service.baseUrl + "GetResourceListHtml?ResourceSet=" + resourceSet);
        }

        function getResourceSets() {
            return $http.get(service.baseUrl + "GetResourceSets");
        }

        function isLocalizationTable() {
            return $http.get(service.baseUrl + "IsLocalizationTable");
        }

        function fromCamelCase(camelCaseText) {
            return $http({ method: 'POST', url: service.baseUrl + "FromCamelCase", data: '"' + camelCaseText + '"' });
        }

        function getAllLocaleIds(resourceSet) {
            return $http.get(service.baseUrl + "GetAllLocaleIds?ResourceSet=" + resourceSet);
        }

        function getResourceItems(resourceId, resourceSet) {            
            return $http.post(
                service.baseUrl + "GetResourceItems",
                {
                    ResourceId: resourceId,
                    ResourceSet: resourceSet
                });
        }

        function getResourceGridItems(resourceSet) {
            return $http.get(service.baseUrl + "GetAllResourcesForResourceGrid?resourceSet=" + resourceSet);
        }

        function getResourceStrings(resourceId, resourceSet) {
            return $http.get(service.baseUrl + "?ResourceId=" + resourceId + "&ResourceSet=" + resourceSet);
        }

        // adds or updates a resource
        function updateResource(resource) {
            return $http.post(service.baseUrl + "UpdateResource", resource);
        }

        function updateResourceString(value, resourceId, resourceSet, localeId,comment) {
            var parm = {
                value: value,
                resourceId: resourceId,
                resourceSet: resourceSet,
                localeId: localeId,
                comment: comment
            };

            return $http.post(service.baseUrl + "UpdateResourceString", parm);
        }

        function updateComment(comment, resourceId, resourceSet, localeId) {
            var parm = {                
                resourceId: resourceId,
                resourceSet: resourceSet,
                localeId: localeId,
                comment: comment
            };

            return $http.post(service.baseUrl + "UpdateComment", parm);
        }

        function deleteResource(resourceId, resourceSet, localeId) {
            var parm = {                
                resourceId: resourceId,
                resourceSet: resourceSet,
                localeId: localeId
            };

            return $http.post(service.baseUrl + "DeleteResource", parm);
        }

        function renameResource(resourceId, newResourceId, resourceSet) {
            var parm = {
                resourceId: resourceId,
                newResourceId: newResourceId,
                resourceSet: resourceSet                
            };

            return $http.post(service.baseUrl + "RenameResource", parm);
        }

        function deleteResourceSet(resourceSet) {
           return $http.get(service.baseUrl + "DeleteResourceSet?ResourceSet=" + resourceSet);
        }
        function renameResourceSet(oldResourceSet, newResourceSet) {
            return $http.get(service.baseUrl + "RenameResourceSet?oldResourceSet=" + oldResourceSet + "&newResourceSet=" + newResourceSet);
        }
        function reloadResources() {
            return $http.get(service.baseUrl + "ReloadResources?&t=" + new Date().getTime);
        }
        function backup() {
            return $http.get(service.baseUrl + "Backup");
        }
        function createTable() {
            return $http.get(service.baseUrl + "CreateTable");
        }
        function createClass(file, namespace, resourceSets, classType) {
            var parm = {
                fileName: file,
                namespace: namespace,
                resourceSets: resourceSets,
                classType: classType || "DbRes"
            };

            return $http.post(service.baseUrl + "CreateClass", parm);
        }
        function exportResxResources(path, resourceSets) {
            var parm = {
                outputBasePath: path || "",
                resourceSets: resourceSets
            };

            return $http.post(service.baseUrl + "ExportResxResources", parm);
        }
        function importResxResources(path) {
            path = path || "";

            return $http.get(service.baseUrl + "ImportResxResources?inputBasePath=" + encodeURIComponent(path));
        }
        function getLocalizationInfo() {
            // cache
            if (service.localizationInfo)
                return ww.angular.$httpPromiseFromValue($q,service.localizationInfo);
            
            return $http.get(service.baseUrl + "GetLocalizationInfo");
        }
        function isRtl(localeId) {
            return $http.get(service.baseUrl + "IsRtl?localeId=" + localeId);
        }
    }
})();
    