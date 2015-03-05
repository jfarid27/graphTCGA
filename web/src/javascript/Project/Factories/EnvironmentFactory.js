(function(){

    define([], function(){

        function EnvironmentFactory() {

            var self = this;

            self.allFiles = undefined
            self.selectedType = {name:'.TSV', value:'tsv'}
            self.selectedFolder = undefined
            self.availableTypes = [
                        //{name:'.JSON', value:'json'},
                        {name:'.TSV', value:'tsv'},
                        //{name:'Gephi', value:'gephi'},
                        //{name:'Cytoscape', value:'cytoscape'}
                    ]
            self.availableFolders = undefined
            self.availableFiles = undefined
            self.allFiles = undefined
            self.interactionThreshold = undefined
            self.zScoreThreshold = {
                max: 6,
                min: 5
            }
            self.graph = undefined
            self.searchTerm = undefined
            self.matchingTerms = undefined
            self.displayEdges = undefined
        }

        return EnvironmentFactory


    })

})()
