'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

// Custom helper modules.
const mcLogo = require('./mc-logo');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(mcLogo);

    // Provide the user with prompts.
    var prompts = [
      {
        name: 'themeName',
        message: 'What is your theme\'s human readable name?',
        default: _.startCase(this.appname) // Default to current folder name.
      },
      {
        name: 'themeNameMachine',
        message: 'What is your theme\'s machine name? EX: unicorn_theme',
        default: function (answers) {
          // Default to snake case theme name
          return _.snakeCase(answers.themeName);
        }
      },
      {
        name: 'themeDesc',
        message: 'What is your theme\'s description?',
        default: function (answers) {
          // Default to a helpful reminder to change the description later.
          // eslint-disable-next-line max-len
          return 'Update ' + answers.themeName + '.info.yml if you want to change the theme description later.';
        }
      },
      {
        name: 'ignoreDist',
        type: 'confirm',
        // eslint-disable-next-line max-len
        message: 'Should we update the .gitignore to ignore compiled files? (i.e. /dist)',
        default: true
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // Should we ignore ./dist files or not?
      this.ignoreDist = props.ignoreDist;

      // Create a underscored version of the theme name.
      this.cleanThemeName = _.snakeCase(props.themeName);

      // Use the user provided theme machine name.
      this.themeNameMachine = props.themeNameMachine;

      // Create a dashed version of the theme name.
      this.dashedThemeName = _.kebabCase(props.themeName);

      // Get pkg info so we can create a 'generated on' comment.
      this.pkg = JSON.parse(
        fs.readFileSync(
          path.resolve(path.join(__dirname, '../../package.json')), 'utf8'
        )
      );

      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  }

  configuring() {
    // Add the Drupal libraries file so we can append additional
    // libraries to it if selected by the user.
    this.fs.copyTpl(
      this.templatePath('_theme_name.libraries.yml'),
      this.destinationPath(this.themeNameMachine + '.libraries.yml'),
      {
        themeNameMachine: this.themeNameMachine
      }
    );

    // Prompt the user for start kit components. If any are selected
    // they will be copied over to the stories folder and the libraries.yml
    // file will be appended with the component library.
    this.composeWith('mc-d10-theme:starter-kit', {
      themeName: this.themeNameMachine
    });
  }

  writing() {
    // Create the project configuration.
    // This adds node modules and tools needed.
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        themeName: this.themeNameMachine
      }
    );
    // Only ignore ./dist files if the user has selected
    // that option.
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'),
      {
        ignoreDist: this.ignoreDist
      }
    );
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('prettierrc.json'),
      this.destinationPath('.prettierrc.json')
    );
    this.fs.copy(
      this.templatePath('_README.md'),
      this.destinationPath('README.md')
    );
    this.fs.copy(
      this.templatePath('eslintrc.json'),
      this.destinationPath('.eslintrc.json')
    );
    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore')
    );
    this.fs.copy(
      this.templatePath('stylelintrc.yml'),
      this.destinationPath('.stylelintrc.yml')
    );
    this.fs.copy(
      this.templatePath('.storybook'),
      this.destinationPath('.storybook')
    );
    // We need the theme machine name so we can set
    // correct namespaces.
    this.fs.copyTpl(
      this.templatePath('.storybook/environment.js'),
      this.destinationPath('.storybook/environment.js'),
      {
        themeNameMachine: this.themeNameMachine
      }
    );
    this.fs.copy(
      this.templatePath('static'),
      this.destinationPath('static')
    );
    this.fs.copy(
      this.templatePath('_src/stories/global'),
      this.destinationPath('src/stories/global')
    );
    this.fs.copy(
      this.templatePath('_src/stories/Introduction.stories.mdx'),
      this.destinationPath('src/stories/Introduction.stories.mdx')
    );
    this.fs.copy(
      this.templatePath('_src/stories/assets'),
      this.destinationPath('src/stories/assets')
    );
    this.fs.copy(
      this.templatePath('_src/stories/components'),
      this.destinationPath('src/stories/components')
    );
    this.fs.copy(
      this.templatePath('_src/templates'),
      this.destinationPath('src/templates')
    );

    const templates = [
      'block',
      'content',
      'field',
      'form',
      'layout',
      'layouts',
      'media',
      'misc',
      'navigation',
      'user',
      'views'
    ];

    templates.map(async (template) => {

      // Copy the selected component into the theme.
      // Exclude the templates folder, it needs to go in a different directory.
      this.fs.copyTpl(
        [
          this.templatePath(`_src/templates/${template}`)
        ],
        this.destinationPath(`src/templates/${template}`),
        {
          themeNameMachine: this.themeNameMachine,
          overwrite: false
        }
      );
    });

    // Copy over the selected components.
    const components = [
      'alerts',
      'badge',
      'breadcrumb',
      'button',
      'card',
      'carousel',
      'checkbox',
      'color',
      'divider',
      'dropdown',
      'field-label',
      'header',
      'heading',
      'image',
      'inline-menu',
      'inline-navigation',
      'link',
      'logo',
      'main-menu',
      'menu',
      'modal',
      'pager',
      'popover',
      'radio',
      'rich-text',
      'search-box',
      'search-results',
      'shadow',
      'sidebar',
      'site-footer',
      'social-icons',
      'spacing',
      'spinner',
      'toggle',
      'tooltip',
      'typography',
      'utility-nav',
      'video'
    ];

    components.map(async (component) => {

      // Copy the selected component into the theme.
      // Exclude the templates folder, it needs to go in a different directory.
      this.fs.copyTpl(
        [
          this.templatePath(`_src/stories/components/${component}`)
        ],
        this.destinationPath(`src/stories/components/${component}`),
        {
          themeNameMachine: this.themeNameMachine,
          overwrite: false
        }
      );
    });

    this.fs.copy(
      this.templatePath('favicon.ico'),
      this.destinationPath('favicon.ico')
    );

    this.fs.copy(
      this.templatePath('logo.svg'),
      this.destinationPath('logo.svg')
    );

    // Build out the compiled folders.
    mkdirp('dist');
    mkdirp('dist/css');
    mkdirp('dist/fonts');
    mkdirp('dist/images');
    mkdirp('dist/js');

    // Some folders remain empty so add in a gitkeep
    // so they're checked into git.
    this.fs.copy(
      this.templatePath('gitkeep'),
      this.destinationPath('dist/css/.gitkeep')
    );
    this.fs.copy(
      this.templatePath('gitkeep'),
      this.destinationPath('dist/fonts/.gitkeep')
    );
    this.fs.copy(
      this.templatePath('gitkeep'),
      this.destinationPath('dist/images/.gitkeep')
    );
    this.fs.copy(
      this.templatePath('gitkeep'),
      this.destinationPath('dist/js/.gitkeep')
    );

    // Add build tools.
    this.fs.copy(
      this.templatePath('_gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    this.fs.copy(
      this.templatePath('_gulp-tasks'),
      this.destinationPath('gulp-tasks')
    );
    this.fs.copy(
      this.templatePath('postcss.config.js'),
      this.destinationPath('postcss.config.js')
    );

    // Create the theme files.
    //
    // Create theme.info.yml with data provided.
    this.fs.copyTpl(
      this.templatePath('_theme_name.info.yml'),
      this.destinationPath(this.themeNameMachine + '.info.yml'),
      {
        themeName: this.props.themeName,
        themeDesc: this.props.themeDesc,
        themeNameMachine: this.themeNameMachine,
        pkg: this.pkg
      }
    );
    // Create theme.breakpoints.yml with data provided.
    this.fs.copyTpl(
      this.templatePath('_theme_name.breakpoints.yml'),
      this.destinationPath(this.themeNameMachine + '.breakpoints.yml'),
      {
        themeName: this.props.themeName,
        themeNameMachine: this.themeNameMachine
      }
    );
    // Create theme.theme with data provided.
    this.fs.copyTpl(
      this.templatePath('_theme_name.theme'),
      this.destinationPath(this.themeNameMachine + '.theme'),
      {
        themeNameMachine: this.themeNameMachine
      }
    );

    this.fs.copy(
      this.templatePath('_screenshot.png'),
      this.destinationPath('screenshot.png')
    );
  }

  install() {
    // Need to see if we still need this.
    this.npmInstall();

    // Install the following node modules specifically for theme generator.
    // Adding the `yo generator-mc-d10-theme` so users can quickly
    // run the component sub-generator locally.
    const npmArray = [
      'yo',
      'generator-mc-d10-theme'
    ];

    // This runs `npm install ... --save-dev` on the command line.
    this.npmInstall(npmArray, {
      saveDev: true
    });
  }

  end() {
    this.log(chalk.cyan.bgBlack.bold(
      // eslint-disable-next-line indent
`☠️  NOTE: Your new generated theme contains a fair bit of boilerplate code.
This is by design. If you don't need it PLEASE delete it.
You can always rerun the generator some other time in a different directory
and copy over what you're missing.`));
    this.log(chalk.red('🚀'));
  }
};
