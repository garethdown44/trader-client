const fs = require('fs');
const colors = require('colors');
const cheerio = require('cheerio');

const useTrackJs = false; // If you choose not to use TrackJS, just set this to false and the build warning will go away.
const trackJsToken = ''; // If you choose to use TrackJS, insert your unique token here. To get a token, go to https://trackjs.com

const remove = require('remove');

remove.removeSync('./dist', { ignoreErrors: true });

fs.mkdirSync('./dist');
fs.mkdirSync('./dist/lib');
fs.mkdirSync('./dist/lib/js');
fs.mkdirSync('./dist/lib/font-awesome/');
fs.mkdirSync('./dist/lib/font-awesome/css');

fs.readFile('index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  // since a separate spreadsheet is only utilized for the production build, need to dynamically add this here.
  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  if (useTrackJs) {
    if (trackJsToken) {
      const trackJsCode = `<!-- BEGIN TRACKJS Note: This should be the first <script> on the page per https://my.trackjs.com/install --><script>window._trackJs = { token: '${trackJsToken}' };</script><script src=https://d2zah9y47r7bi2.cloudfront.net/releases/current/tracker.js></script><!-- END TRACKJS -->`;

      $('head').prepend(trackJsCode); // add TrackJS tracking code to the top of <head>
    } else {
      console.log('To track JavaScript errors, sign up for a free trial at TrackJS.com and enter your token in /tools/build.html on line 10.'.yellow);
    }
  }

  fs.writeFile('dist/index.html', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});

fs.createReadStream('./lib/bootstrap-slate.css').pipe(fs.createWriteStream('./dist/lib/bootstrap-slate.css'));
fs.createReadStream('./lib/font-awesome/css/font-awesome.css').pipe(fs.createWriteStream('./dist/lib/font-awesome/css/font-awesome.css'));

fs.createReadStream('./lib/js/jquery.min.js').pipe(fs.createWriteStream('./dist/lib/js/jquery.min.js'));
fs.createReadStream('./lib/js/bootstrap.min.js').pipe(fs.createWriteStream('./dist/lib/js/bootstrap.min.js'));