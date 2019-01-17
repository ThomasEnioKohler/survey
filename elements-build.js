const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/apfprofisurvey-custom-element/runtime.js',
    './dist/apfprofisurvey-custom-element/polyfills.js',
    './dist/apfprofisurvey-custom-element/scripts.js',
    './dist/apfprofisurvey-custom-element/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/apfprofisurvey-custom-element.js');
  await fs.copyFile(
    './dist/apfprofisurvey-custom-element/styles.css',
    'elements/styles.css'
  );

  await fs.copyFile(
    './dist/apfprofisurvey-custom-element/favicon.ico',
    'elements/favicon.ico'
  );

  /* await fs.copyFile(
     'node_modules/@angular/material/prebuilt-themes/indigo-pink.css',
     'elements/indigo-pink.css'
   );
   */
})();
