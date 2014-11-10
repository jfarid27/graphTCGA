(function(){

    define([], function(){

        function EnvironmentFactory() {

            var self = this;

            self.selectedFolder = undefined
            self.selectedFiles = undefined
            self.selectedType = undefined
            self.availableTypes = ['.json', '.tsv', '.tsv (Gephi)', '.cyjs (Cytoscape)']
            self.availableFolders = undefined
            self.availableFiles = undefined
            self.interactionThreshold = undefined
            self.zScoreThreshold = undefined
            self.graph = undefined
        }

        return EnvironmentFactory


    })

})()
