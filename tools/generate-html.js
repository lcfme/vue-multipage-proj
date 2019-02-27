var through = require('through');
var fs = require('fs');
var path = require('path');

module.exports = function generateHtml(path) {
  var data = '';
  var stream = through(write, end);
  function write(buf) {
    data += buf;
  }
  function end() {
    data =
      `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Page</title>
      </head>
      <body>
        <div id="app"></div>
        <script crossorigin="anonymous">` +
      data +
      `</script>
  </body>
</html>`;

    stream.queue(data);
    stream.queue(null);
  }

  return stream;
};
