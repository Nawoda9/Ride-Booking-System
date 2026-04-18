const killPort = require('kill-port');

const PORTS = [3003, 5000];

Promise.all(PORTS.map((port) => killPort(port).catch(() => {}))).then(() => {
  console.log('[mtit] Ports ready:', PORTS.join(', '));
});
