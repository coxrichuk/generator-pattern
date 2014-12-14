'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the kickass' + chalk.red('Pattern') + ' generator!'
    ));

    var prompts = [
        {
            type: 'input',
            name: 'patternName',
            message: 'What is the name of your Pattern?',
            default: true,
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
                    value: '03-template',
                },
                {
                    name: 'Page',
                    value: '04-pages'
                }
            ]
        }
    
      
    ];

    this.prompt(prompts, function (props) {
        this.patternName = props.patternName;
        this.patternType = props.patternType;

        done();
        }.bind(this));
    },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
        
        this.sassDir = 'source/sass/patterns/';
        this.jsDir = 'source/javascript/patterns/';
        this.patternDir = 'source/_patterns/';
        
        this.mkdir(this.sassDir + this.patternType + '/' + this.patternName);
        
        this.mkdir(this.jsDir + this.patternType + '/' + this.patternName);
        this.mkdir(this.patternDir + this.patternType + '/' + this.patternName);
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
