// https://github.com/yandeu/five-server#readme
// https://github.com/yandeu/five-server/blob/main/src/types.ts
const FiveServer = require('five-server').default;
const fiveServer = new FiveServer();
const option = {
  useLocalIp: true,
  // host :'localhost',
  port: 3000,
  open: false,
  //watch: ['./page', './css'],
  // wait:1000,
  // injectCss:false,
  // ignore: [/\.s[ac]ss$/i, /\.tsx?$/i],
  // ignore: ['./dist'],
};

fiveServer.start(option);