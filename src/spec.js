const { expect } = require('chai');
const getMissingEnvVars = require('./');

describe('missingEnvVars', () => {
  const config = {
    '*': ['falafels'],
    'myEnv': ['foo'],
    '!myEnv': ['notTheOtherEnv']
  };

  const env = process.env.NODE_ENV;
  afterEach(() => {
    process.env.NODE_ENV = env;
  });

  it('will return an array of errors if a required enviroment variables are missing', () => {
    const actual = getMissingEnvVars(config);
    expect(actual.length).to.equal(2);
    expect(actual).to.contain('falafels');
    expect(actual).to.contain('notTheOtherEnv');
  });

  it('will return false if enviroment variables are not missing', () => {
    process.env.falafels = 'yummy!';
    process.env.notTheOtherEnv = '';

    const actual = getMissingEnvVars(config);
    expect(actual.length).to.equal(0);

    delete process.env.falafels;
    delete process.env.notTheOtherEnv;
  });

  it('will return an array of errors if a required enviroment variables are missing when on a different node enviroment', () => {
    process.env.NODE_ENV = 'myEnv';

    const actual = getMissingEnvVars(config);
    expect(actual.length).to.equal(2);
    expect(actual).to.contain('falafels');
    expect(actual).to.contain('foo');
  });

  it('will return false if enviroment variables for the current NODE_ENV are not missing', () => {
    process.env.NODE_ENV = 'myEnv';
    process.env.falafels = 'yummy!';
    process.env.foo = 'bar';

    const actual = getMissingEnvVars(config);
    expect(actual.length).to.equal(0);

    delete process.env.falafels;
    delete process.env.foo;
  });
});
