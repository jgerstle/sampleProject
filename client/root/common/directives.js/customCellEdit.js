angular.module('app.directives').directive('customCellEdit', [function() {
    return {
        require: 'ngModel',
        link: function (scope, element, attributes, controller) {
            // elm[0].addEventListener('blur', function(){
            //     scope.$emit('ngGridEventEndCellEdit');
            // })
            // elm.bind('blur', function() {
            //     scope.$emit('ngGridEventEndCellEdit');
            // })
            controller.$viewChangeListeners.push(function() {
                element[0].blur();
                scope.$emit('uiGridEventEndCellEdit');
            })
            // angular.element(elm).bind('blur', function () {
            //     scope.$emit('ngGridEventEndCellEdit');
            // });
        }
    };
}]);