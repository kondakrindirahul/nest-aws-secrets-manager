<p align="center">
  <img src="https://miro.medium.com/max/2880/1*z2lLrLCCnlTsC2XsMFnvQw.png" width="320" alt="Secrets Manager Logo" />
</p>

## Description

An effficient <a href="https://docs.nestjs.com/" target="blank">Nest.js</a> AWS Secrets Manager

## Installation

```bash
$ npm install nest-aws-secrets-manager
```

## Adding the Global Module

Add the AwsSecretsManagerModule to your App Module imports. It will register globally.

```typescript
import { AWSSecretsManagerModule } from 'nest-aws-secrets-manager';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { SecretsManager } from 'aws-sdk';

@Module({
  imports: [AWSSecretsManagerModule.forRoot(new SecretsManager())],
  providers: [AppService],
})
export class AppModule {}
```

### Use the Secrets Manager

```typescript
import { SecretsRetrieverService } from 'nest-aws-secrets-manager';

export class AppService {
  constructor(private readonly secretsRetrieverService: SecretsRetrieverService) {}

  private async getCredentials: Credentials {
    return await this.secretsRetrieverService.getSecret<Credentials>('app-credentials');
  }
}
```

## Support

Pull requests are welcome. Please remember that commits must be made using Angular [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)

## Stay in touch

- Author - [Rahul Kondakrindi](mailto::rahul.kondakrindi@gmail.com)

## License

Nest-AWS-Secrets_manager is [MIT licensed](LICENSE).
