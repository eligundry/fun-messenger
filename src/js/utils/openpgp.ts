import openpgp from 'openpgp';

openpgp.initWorker({
  path: '~/node_modules/openpgp/dist/openpgp.worker.js',
});

export default openpgp;
