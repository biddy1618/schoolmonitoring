Package.describe({
  name: 'ruslan:filterable',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.addFiles('ruslan:filterable.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ruslan:filterable');
  api.addFiles('ruslan:filterable-tests.js');
});
