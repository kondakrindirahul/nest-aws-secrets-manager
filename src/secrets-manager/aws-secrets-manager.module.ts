import { DynamicModule, Global, Module } from '@nestjs/common';

import { AWS_SECRETS_MANAGER_TOKEN } from './tokens';
import { SecretsManager } from 'aws-sdk';
import { SecretsRetrieverService } from './secrets-retriever.service';

@Global()
@Module({})
export class AWSSecretsManagerModule {
  static forRoot(secretsManager: SecretsManager): DynamicModule {
    return {
      module: AWSSecretsManagerModule,
      providers: [
        SecretsRetrieverService,
        {
          provide: AWS_SECRETS_MANAGER_TOKEN,
          useValue: secretsManager,
        },
      ],
      exports: [SecretsRetrieverService],
    };
  }
}
