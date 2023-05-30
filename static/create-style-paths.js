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
let themeDirectory = 'toucan';
let directoryPath = '../web/themes/custom/' + themeDirectory + '/templates';
let directories = fs.readdirSync(directoryPath);
let drupalPostCSSFile = 'drupal-post-css.sh';
let drupalPostCSSFilePath = "./" + drupalPostCSSFile;
let nodeSASSArray = [];
let postCSSArray = [];

let drupalCSSFile = 'drupal-css.sh';
let drupalCSSFilePath = "./" + drupalCSSFile;

(function () {
   fs.createWriteStream(drupalNodeCSSFilePath, { mode: 0o755 });
   fs.createWriteStream(drupalPostCSSFilePath, { mode: 0o755 });
   fs.createWriteStream(drupalCSSFilePath, { mode: 0o755 });

   function generateDrupalCSS() {
      console.log("*** scanning: " + directoryPath);
      directories.forEach(function(directoryName) {
         console.log(directoryName);
         if(directoryName.toString().indexOf(".twig") === -1 && directoryName.toString().indexOf(".scss") === -1 && directoryName.toString().indexOf(".css") === -1 && directoryName.toString().indexOf(".yml") === -1 && directoryName.toString().indexOf(".DS_Store") === -1) {

            if (directoryName.toString() === 'styles') {
               console.log("in styles");
               let sassexec = 'npx sass --style=compressed ../web/themes/custom/' + themeDirectory + '/templates/' + directoryName + '/scss:../web/themes/custom/' + themeDirectory + '/css';
               nodeSASSArray.push(sassexec);
               console.log(sassexec);
               let postexec = 'npx postcss ../web/themes/custom/' + themeDirectory + '/css/' + directoryName + '/css --no-map --verbose --config=postcss.config.js --dir ../web/themes/custom/' + themeDirectory + '/templates/' + directoryName + '/css';
               console.log(postexec);
               postCSSArray.push(postexec);
            }

            let subDirectories = fs.readdirSync(directoryPath + '/' + directoryName);
            subDirectories.forEach(function(subDirectoryName) {
               console.log("\tsubdirectory: " + subDirectoryName);

               if(subDirectoryName.toString().indexOf(".twig") === -1 && subDirectoryName.toString().indexOf(".scss") === -1 && subDirectoryName.toString().indexOf(".css") === -1 && subDirectoryName.toString().indexOf(".yml") === -1 && subDirectoryName.toString().indexOf(".DS_Store") === -1) {

                  let styleDirectories = fs.readdirSync(directoryPath + '/' + directoryName + '/' + subDirectoryName);
                  console.log("\t\tstyleDirectories:" + styleDirectories);
                  styleDirectories.forEach(function(styleDirectoryName) {
                     console.log("styleDirectoryName:" + styleDirectoryName)
                     //let cssDir = directoryPath + '/' + directoryName + '/' + subDirectoryName + '/css';

                     // if (!fs.existsSync(cssDir)){
                     //    console.log("creating directory " + cssDir)
                     //    fs.mkdirSync(cssDir);
                     // }

                     if(styleDirectoryName.toString() === 'scss') {
                        console.log("In a SASS folder");
                        let sassexec = 'npx sass --style=compressed ../web/themes/custom/' + directoryPath + '/' + directoryName + '/' + subDirectoryName + '/scss:' + directoryPath + '/' + directoryName + '/' + subDirectoryName + '/css';
                        nodeSASSArray.push(sassexec);
                        console.log(sassexec);
                        let postexec = 'npx postcss ../web/themes/custom/' + directoryPath + '/' + directoryName + '/' + subDirectoryName + '/css' + ' --no-map --verbose --config=postcss.config.js --dir ' + directoryPath + '/' + directoryName + '/' + subDirectoryName + '/css';
                        console.log(postexec);
                        postCSSArray.push(postexec);
                     }
                  });

               }

            });

         }
      });

      nodeSASSArray.forEach(function(item) {
         fs.appendFileSync(drupalNodeCSSFilePath,item + '\n');
      });

      postCSSArray.forEach(function(item) {
         fs.appendFileSync(drupalPostCSSFilePath,item + '\n');
      });

      fs.appendFileSync(drupalCSSFilePath,drupalNodeCSSFilePath + '\n');
      fs.appendFileSync(drupalCSSFilePath,drupalPostCSSFilePath);
   }

   generateDrupalCSS();
}());
