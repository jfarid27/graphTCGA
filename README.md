graphTCGA
=========

[![Build Status](https://travis-ci.org/jfarid27/graphTCGA.svg?branch=master)](https://travis-ci.org/jfarid27/graphTCGA)
===

A Node.js server for visualizing, downloading, and transforming PANDA networks.

###Using as a command line tool
```bash
node index.js -i <Number> -z <Number> -f <Format> [--output=<String>] <PandaDataFile>
```
* -i - (required) Panda interaction threshold. All edges with interaction equal to or greater than this number will be added.
* -z - (required) Panda double-sided Z-Score threshold. All edges with Z-Score equal to or greater than this number will be added.
* -f - (required) Output format.
* <Format> = json | tsv | gephi | cytoscape
* -o - (Optional) Output filepath to create a new file for filtering. If this parameter isn't set, the program will print to STDOUT for piping on unix-like systems.
* <PandaDataFile> - (required) Path to Panda data file you want to filter.

###Starting the server
1. Install deps
```bash
npm install
```
2. Add files to /Data folder in /Panda module and update folderStruct.js
3. Start the server.
```bash
npm start
```
