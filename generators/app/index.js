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
      message: 'Project tags (comma separated. Allowed characters are: a-z, 0-9, +, -, # and .)'
    }];

    this.prompt(prompts, function (props) {
      var tags = props.tags || '';
      this.props = props;
      this.props.tags = tags.split(',');
      let accTags = [];
      this.props.tags.forEach(function (tag, index, tagsArray){
        tag = tag.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        if (/^[a-z0-9\+\.#-]*$/.test(tag) && tag != '') {
          accTags.push(tag);
        }
      });
      this.props.tags = accTags;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var name = this.props.name || '',
          filename = name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
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
