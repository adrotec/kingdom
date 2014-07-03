var allTestFiles = [];
var TEST_REGEXP = /(\.spec)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  // dynamically load all test files
  deps: allTestFiles,
  paths: {
    'bower': './bower_components',
    'deps': './node_modules',
    'jquery': './bower_components/jquery/jquery',
  },
	map: {
    '*': {
      'kingdom': 'src/index',

      'di': 'deps/di/dist/amd/index',

      'text': 'bower/requirejs-text/text',
      'durandal': 'bower/durandal/js',
      'plugins': 'bower/durandal/js/plugins',
      'transitions': 'bower/durandal/js/transitions',
      'knockout': 'bower/knockout.js/knockout.debug',
      'durandal-punches': 'bower/durandal-punches/build/output/knockout.punches'
    }
	},
  shim: {
  },

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
