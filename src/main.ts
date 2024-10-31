import type { Construct } from 'constructs'
import type { IP6CDKGithubOidcProviderProps } from 'p6-cdk-github-oidc-provider'
import * as process from 'node:process'
import * as cdk from 'aws-cdk-lib'
import { P6CDKGithubOidcProvider } from 'p6-cdk-github-oidc-provider'

export class MyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    const githubOidcProvider: IP6CDKGithubOidcProviderProps = {
      repo: 'p6m7g8/p6m7g8.com',
    }

    new P6CDKGithubOidcProvider(this, 'P6CDKGithubOidcProvider', {
      ...githubOidcProvider,
    })
  }
}

// the AwsEnvironment
const env = {
  account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
}

// create the app and stack
const app = new cdk.App()
new MyStack(app, 'p6-roles-github-oidc-provider', { env })
app.synth()
