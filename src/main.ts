import type { Construct } from 'constructs'
import * as process from 'node:process'
import * as cdk from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'
import { P6CDKGHARole } from 'p6-cdk-gha-role'
import { P6CDKGithubOidcProvider } from 'p6-cdk-github-oidc-provider'

export class MyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    const githubOidcProvider = new P6CDKGithubOidcProvider(this, 'P6CDKGithubOidcProvider')
    new P6CDKGHARole(this, 'p6-roles-gha-p6m7g8-p6-roles-role', {
      principle: githubOidcProvider.openIdConnectProviderArn,
      repo: 'p6m7g8/p6-roles',
      policies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
    })

    new P6CDKGHARole(this, 'p6-roles-gha-p6m7g8-p6-cdk-website-plus-role', {
      principle: githubOidcProvider.openIdConnectProviderArn,
      repo: 'p6m7g8/p6-cdk-website-plus',
      policies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
    })

    new P6CDKGHARole(this, 'p6-roles-gha-p6m7g8-p6-sites-role', {
      principle: githubOidcProvider.openIdConnectProviderArn,
      repo: 'p6m7g8/p6-sites',
      policies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
    })

    new P6CDKGHARole(this, 'p6-roles-gha-p6m7g8-p6-domain-records-role', {
      principle: githubOidcProvider.openIdConnectProviderArn,
      repo: 'p6m7g8/p6-domain-records',
      policies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
    })

    new P6CDKGHARole(this, 'p6-roles-gha-p6m7g8-p6-domains-role', {
      principle: githubOidcProvider.openIdConnectProviderArn,
      repo: 'p6m7g8/p6-domains',
      policies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
    })

    new P6CDKGHARole(this, 'p6-roles-gha-p6m7g8-p6m7g8-com-role', {
      principle: githubOidcProvider.openIdConnectProviderArn,
      repo: 'p6m7g8/p6m7g8.com',
      policies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('CloudFrontFullAccess'),
      ],
    })

    new P6CDKGHARole(this, 'p6-roles-gha-pgollucci-gollucci-com-role', {
      principle: githubOidcProvider.openIdConnectProviderArn,
      repo: 'pgollucci/gollucci.com',
      policies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('CloudFrontFullAccess'),
      ],
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
