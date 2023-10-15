import type { SSTConfig } from 'sst';
import { StaticSite } from 'sst/constructs';
import { HttpVersion } from 'aws-cdk-lib/aws-cloudfront';

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
        cdk: {
          distribution: {
            httpVersion: HttpVersion.HTTP2_AND_3,
          },
        },
      });
      stack.addOutputs({
        Url: site.customDomainUrl || site.url,
      });
    });
  },
} satisfies SSTConfig;
