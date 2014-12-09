(function(){

    define([], function(){

        function EnvironmentFactory() {

            var self = this;

            self.selectedFolder = undefined
            self.selectedFile = undefined
            self.selectedType = {name:'.TSV', value:'tsv'}
            self.availableTypes = [
                        //{name:'.JSON', value:'json'},
                        {name:'.TSV', value:'tsv'},
                        //{name:'Gephi', value:'gephi'},
                        //{name:'Cytoscape', value:'cytoscape'}
                    ]
            self.availableFolders = undefined
            self.availableFiles = undefined
            self.interactionThreshold = undefined
            self.zScoreThreshold = {
                max: 4,
                min: -4
            }
            self.graph = undefined
        }

        return EnvironmentFactory


    })

})()
