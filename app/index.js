'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the kickass' + chalk.red(' Pattern ') + ' generator!'
        ));

    var prompts = [
        {
            type: 'input',
            name: 'patternName',
            message: 'What is the name of your Pattern?',
            default: "pattern-name",
            required: true
        },
        {
            type: 'list',
            name: 'patternType',
            message: 'What type of pattern is this?',
            require: true,
            default: '00-atoms',
            choices: [
                {
                    name: 'Atom',
                    value: '00-atoms'
                },
                {
                    name: 'Molecule',
                    value: '01-molecules'
                },
                {
                    name: 'Organism',
                    value: '02-organisms'
                },
                {
                    name: 'Template',
                    value: '03-templates',
                },
                {
                    name: 'Page',
                    value: '04-pages'
                }
            ]
        },
        {
            type: 'list',
            name: 'patternTypeImport',
            message: 'Update pattern type import',
            require: true,
            default: true,
            choices:    [
                {
                    name: 'Yes',
                    value: true
                },
                {
                    name: 'No',
                    value: false
                }
            ]
        }
    
      
    ];

    this.prompt(prompts, function (props) {
        this.patternName = props.patternName.replace(' ', '-').toLowerCase();
        this.patternType = props.patternType.replace(' ', '-').toLowerCase();
        this.patternTypeImport = props.patternTypeImport;
        
        this.patternFuncName = props.patternName.replace(/(-.)/g,function(x){
                                return x[1].toUpperCase()
                            });
        

        done();
        }.bind(this));
    },

  writing: {
    
    projectfiles: function () {
        
        this.sassDir = 'source/sass/patterns/' + this.patternType + '/' + this.patternName + '/';
        this.jsDir = 'source/javascript/patterns/' + this.patternType + '/' + this.patternName + '/';
        this.patternDir = 'source/_patterns/' + this.patternType + '/' + this.patternName + '/';
        this.imagesDir = 'source/images/patterns/' + this.patternType + '/' + this.patternName + '/';
        
        // SASS files
        this.mkdir(this.sassDir);
        this.template('_pattern.scss', this.sassDir + '/' + '_' + this.patternName + '.scss');
        this.template('_module.scss', this.sassDir + '/' + '_module.scss');
        this.template('_state.scss', this.sassDir + '/' + '_state.scss');
        this.template('_theme.scss', this.sassDir + '/' + '_theme.scss');
        
        // JS files
        this.mkdir(this.jsDir);
        this.template('_pattern.js', this.jsDir + '/' + '_' + this.patternName + '.js');
        
        // Patterns files
        this.mkdir(this.patternDir);
        this.template('_pattern.mustache', this.patternDir + '/' + this.patternName + '.mustache');
        this.template('_pattern.json', this.patternDir + '/' + this.patternName + '.json');
        
        // Images folder
        this.mkdir(this.imagesDir + 'css/');
        this.mkdir(this.imagesDir + 'front/');
        
        // Update the pattern type import
        if(this.patternTypeImport === true) {
        
            this.importDir = 'source/sass/patterns/' + this.patternType + '/';
            this.rawPatternType = this.patternType.replace(/[^a-z]+/i, '');
            this.importContent = '\n@import "' + this.patternName + '/' + this.patternName + '";';
            
            fs.appendFile(this.importDir + '_' + this.rawPatternType + '.scss', this.importContent);
        }
        
    }
  }
});
