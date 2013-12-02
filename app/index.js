'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var StaticJadeGenerator = module.exports = function StaticJadeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(StaticJadeGenerator, yeoman.generators.Base);

StaticJadeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'appName',
    message: 'What would you like to name this application?',
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;   // Can be used in templates.

    cb();
  }.bind(this));
};

StaticJadeGenerator.prototype.app = function app() {
  this.mkdir('src/scripts');
  this.mkdir('src/images');
  this.mkdir('src/stylesheets');
  this.mkdir('public/js');
  this.mkdir('public/img');
  this.mkdir('public/css');
  this.mkdir('test');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
  this.copy('_index.jade', 'src/index.jade')
  this.copy('_layout.jade', 'src/_layout.jade')
  this.copy('_partial.jade', 'src/_partial.jade')
};

StaticJadeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
