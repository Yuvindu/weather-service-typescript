import type { AWS } from '@serverless/typescript';

import functions from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'weather-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: 'dev',
    profile: 'sls-deployer',
    stackName: '${self:service}-stack-${sls:stage}',
    apiName: '{self:service}-${sls:stage}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ['${self:provider.apiName}-apiKey'],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DBHOSTNAME: 'weather-service.cluster-cjk0uai0m9qz.us-east-1.rds.amazonaws.com',
      DBPORT: '5432',
      DBNAME: 'weatherdb',
      DBUSERNAME: 'postgres',
      DBPASSWORD: 'weathermasterisme',
      DBSCHEMA: 'public',
    },
  },
  // import the function via paths
  functions: functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
