import { DynamicModule, Global, Module } from '@nestjs/common';

import { SecretsManager } from './secrets-manager';

@Global()
@Module({})
export class AWSSecretsManagerModule {
  static forRoot(): DynamicModule {
    return {
      module: AWSSecretsManagerModule,
      providers: [SecretsManager],
      exports: [],
    };
  }
}
