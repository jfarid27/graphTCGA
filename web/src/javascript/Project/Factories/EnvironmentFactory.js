(function(){

    define([], function(){

        function EnvironmentFactory() {

            var self = this;

            self.selectedFolder = undefined
            self.selectedFiles = undefined
            self.availableFolders = undefined
            self.availableFiles = undefined
            self.graph = undefined
        }

        return EnvironmentFactory


    })

})()
