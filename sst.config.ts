import * as cdk from 'aws-cdk-lib';
import * as cf from 'aws-cdk-lib/aws-cloudfront';
import type { SSTConfig } from 'sst';
import { StaticSite } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'personal-site',
      region: 'ap-southeast-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new StaticSite(stack, 'site', {
        buildOutput: 'dist',
        buildCommand: 'pnpm build',
        customDomain: {
          domainName: stack.stage === 'prod' ? 'phucn.dev' : `${stack.stage}.phucn.dev`,
          domainAlias: stack.stage === 'prod' ? 'www.phucn.dev' : '',
          hostedZone: 'phucn.dev',
        },
        // fileOptions: [
        //   { exclude: '*', include: '*.woff2', cacheControl: 'public,max-age=31536000,immutable' },
        // ],
        cdk: {
          distribution: {
            comment: 'Personal site CDK distribution',
            minimumProtocolVersion: cf.SecurityPolicyProtocol.TLS_V1_2_2021,
            httpVersion: cf.HttpVersion.HTTP2_AND_3,
            defaultBehavior: {
              viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
              responseHeadersPolicy: new cf.ResponseHeadersPolicy(stack, 'ResponseHeaderPolicy', {
                comment: 'Security headers response header policy',
                securityHeadersBehavior: {
                  contentSecurityPolicy: {
                    override: true,
                    contentSecurityPolicy: "default-src 'unsafe-inline' https:;",
                  },
                  // strictTransportSecurity: {
                  //   override: true,
                  //   accessControlMaxAge: cdk.Duration.days(365),
                  //   includeSubdomains: true,
                  //   preload: true,
                  // },
                  xssProtection: {
                    modeBlock: true,
                    override: true,
                    protection: true,
                  },
                  frameOptions: {
                    override: true,
                    frameOption: cf.HeadersFrameOption.DENY,
                  },
                },
              }),
            },
          },
          bucket: {
            removalPolicy: cdk.RemovalPolicy.DESTROY,
          },
        },
      });
      stack.addOutputs({
        Url: site.customDomainUrl || site.url,
      });
    });
  },
} satisfies SSTConfig;
