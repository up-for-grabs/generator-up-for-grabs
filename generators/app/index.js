'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the kryptonian ' + chalk.red('Up-For-Grabs') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Project name'
    }, {
      type: 'input',
      name: 'desc',
      message: 'Project description'
    }, {
      type: 'input',
      name: 'site',
      message: 'Project web site'
    }, {
      type: 'input',
      name: 'label',
      message: 'The label associated with your tasks',
      default: 'up-for-grabs'
    }, {
      type: 'input',
      name: 'link',
      message: 'URL which users can view the tasks'
    }, {
      type: 'input',
      name: 'tags',
      message: 'Project tags (comma separated)'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.tags = props.tags.split(/,?\s+/);
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var filename = this.props.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
      this.fs.copyTpl(
        this.templatePath('_project.yml'),
        this.destinationPath(filename + '.yml'),
        this.props
      );
    },

    projectfiles: function () {
    }
  },

  install: function () {
  }
});
