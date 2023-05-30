#npx sass --style=compressed ../src/styles.scss:../web/themes/custom/bonterra/css/styles.css
npx sass --style=compressed ../danaher_src/styles.scss:../web/themes/custom/danaher/css/styles.css


#npx postcss ../web/themes/custom/bonterra/css --no-map --verbose --replace --config=postcss.config.js
#npx postcss dist/css/modules --no-map --verbose --config=postcss.config.js --dir ../web/themes/custom/bonterra/css
#npx postcss dist/css/components --no-map --verbose --config=postcss.config.js --dir ../web/themes/custom/bonterra/css
drush cr

