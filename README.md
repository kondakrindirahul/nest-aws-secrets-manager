<p align="center">
  <img src="https://cdn-images-1.medium.com/max/1600/0*UQBKjEff1uIsXH8W" width="320" alt="Kinesis Logo" />
</p>

## Description

An effficient <a href="https://docs.nestjs.com/" target="blank">Nest.js</a> AWS Secrets Manager

## Installation

```bash
$ npm install nest-aws-secrets-manager
```

## Adding the Global Module

Add the Kinesis Producer to your App Module imports. It will register globally.

```typescript
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [AWSSecretsManagerModule.forRoot()],
  providers: [AppService],
})
export class AppModule {}
```

### Use the Secrets Manager

```typescript
import { hash } from 'crypto';
export class AppService {
  constructor(private readonly secretsManager: AWSSecretsManagerModule) {}

  public async getCredentials(
    secretName: string,
    region: string,
    profile: string,
  ): Promise<void> {
    const secretsManager = new AWSSecretsManager(secretName, region, profile);

    const credentials = (await secretsManager.getCredentials()).valueOf();
  }
}
```

## Support

Pull requests are welcome. Please remember that commits must be made using Angular [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)

## Stay in touch

- Author - [Rahul Kondakrindi](mailto::rahul.kondakrindi@gmail.com)

## License

Nest-AWS-Secrets_manager is [MIT licensed](LICENSE).
