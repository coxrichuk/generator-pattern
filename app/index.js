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
      'Welcome to the kickass' + chalk.red(' Pattern ') + ' generator!'
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
        this.patternName = props.patternName.replace(' ', '-').toLowerCase();
        this.patternType = props.patternType.replace(' ', '-').toLowerCase();

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
        
        this.sassDir = 'source/sass/patterns/' + this.patternType + '/' + this.patternName + '/';
        this.jsDir = 'source/javascript/patterns/' + this.patternType + '/' + this.patternName + '/';
        this.patternDir = 'source/_patterns/' + this.patternType + '/' + this.patternName + '/';
        
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
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
