import type { Construct } from 'constructs'
import * as fs from 'node:fs'
import * as process from 'node:process'
import * as cdk from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'

import * as yaml from 'js-yaml'
import { P6CDKGHARole } from 'p6-cdk-gha-role'
import { P6CDKGithubOidcProvider } from 'p6-cdk-github-oidc-provider'

const CONFIG_FILE = 'conf/roles.yml'

/**
 *
 * @param filePath
 * @returns yamlData
 */
function parseYamlFile(filePath: string): any[] {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const yamlData = yaml.load(fileContents) as any[]
  return yamlData
}
export class MyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    const githubOidcProvider = new P6CDKGithubOidcProvider(this, 'P6CDKGithubOidcProvider')

    const roles: any = parseYamlFile(CONFIG_FILE)
    roles.forEach((role: any) => {
      new P6CDKGHARole(this, `p6-roles-gha-${role.name}-role}`, {
        principle: githubOidcProvider.openIdConnectProviderArn,
        repo: role.repo,
        policies: role.policies?.map((policyName: string) => iam.ManagedPolicy.fromAwsManagedPolicyName(policyName)),
      })
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
