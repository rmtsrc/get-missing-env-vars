module.exports = config => {
  const nodeEnv = process.env.NODE_ENV;
  const env = Object.keys(process.env);
  let checkIfMissing = [];
  let missing = [];

  if (config['*']) {
    checkIfMissing = checkIfMissing.concat(config['*']);
  }

  if (config[nodeEnv]) {
    checkIfMissing = checkIfMissing.concat(config[nodeEnv]);
  }

  Object.keys(config).filter(k => k.indexOf('!') == 0).map(val => {
    if (val.replace('!', '') !== nodeEnv) {
      checkIfMissing = checkIfMissing.concat(config[val]);
    }
  });

  checkIfMissing.map(val => {
    if (env.indexOf(val) === -1) {
      missing.push(val);
    }
  });

  return missing;
};
