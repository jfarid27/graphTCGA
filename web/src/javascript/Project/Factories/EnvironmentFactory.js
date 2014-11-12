(function(){

    define([], function(){

        function EnvironmentFactory() {

            var self = this;

            self.selectedFolder = undefined
            self.selectedFile = undefined
            self.selectedType = undefined
            self.availableTypes = [
                        {name:'.JSON', value:'json'},
                        {name:'.TSV', value:'tsv'},
                        {name:'Gephi', value:'gephi'},
                        {name:'Cytoscape', value:'cytoscape'}
                    ]
            self.availableFolders = undefined
            self.availableFiles = undefined
            self.interactionThreshold = undefined
            self.zScoreThreshold = undefined
            self.graph = undefined
        }

        return EnvironmentFactory


    })

})()
