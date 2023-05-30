/**
 * This file can be used to generate drupal-css executable file for compiling scss to css and running post css against each file.
 *
 * In the terminal, navigate to creative-templates and run `npm install` (if you haven't already).
 *
 * Then run `node create-style-paths.js`. The drupal-css file should generate in the same directory.
 */

let fs = require('fs');

let drupalNodeCSSFile = 'drupal-node-css.sh';
let drupalNodeCSSFilePath = "./" + drupalNodeCSSFile;
let directoryPath = '../web/themes/custom/toucan/templates';
let directories = fs.readdirSync(directoryPath);
let drupalPostCSSFile = 'drupal-post-css.sh';
let drupalPostCSSFilePath = "./" + drupalPostCSSFile;
let nodeSASSArray = [];
let postCSSArray = [];

let drupalCSSFile = 'drupal-css.sh';
let drupalCSSFilePath = "./" + drupalCSSFile;

// let themeYmlFile = 'zensource_dojo_default.libraries.yml';
// let themeYmlFilePath = '../web/themes/custom/toucan/' + themeYmlFile;

(function() {
   fs.createWriteStream(drupalNodeCSSFilePath, { mode: 0o755 });
   fs.createWriteStream(drupalPostCSSFilePath, { mode: 0o755 });
   fs.createWriteStream(drupalCSSFilePath, { mode: 0o755 });

   // function generateThemeYML() {
//    fs.writeFileSync(themeYmlFilePath, "");
//
//    directories.forEach(function(directoryName) {
//       if(directoryName.toString() === 'modules') {
//
//
//          let subDirectories = fs.readdirSync(directoryPath + '/' + directoryName);
//          subDirectories.forEach(function(subDirectoryName) {
//
//             if(subDirectoryName.toString().indexOf(".twig") === -1 && subDirectoryName.toString().indexOf(".scss") === -1 && subDirectoryName.toString().indexOf(".css") === -1 && subDirectoryName.toString().indexOf(".yml") === -1) {
//
//                let styleDirectories = fs.readdirSync(directoryPath + '/' + directoryName + '/' + subDirectoryName);
//                styleDirectories.forEach(function(styleDirectoryName) {
//
//                   if(styleDirectoryName.toString() === 'css') {
//                      fs.appendFileSync(themeYmlFilePath, 'pull-quote:' + '\n');
//                      fs.appendFileSync(themeYmlFilePath, 'version: VERSION' + '\n');
//                      fs.appendFileSync(themeYmlFilePath, 'css:' + '\n');
//                      fs.appendFileSync(themeYmlFilePath, 'component:' + '\n');
//                      fs.appendFileSync(themeYmlFilePath, 'templates/modules/pull-quote/css/pull-quote.css: {}' + '\n\n');
//                   }
//
//                });
//
//             }
//
//          });
//
//       }
//    });
//
// }
// generateThemeYML();

}());
