<p align="center">
  <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.stackshare.io%2Fservice%2F8789%2Faws-secret-manager.png&imgrefurl=https%3A%2F%2Fstackshare.io%2Fstackups%2Faws-secrets-manager-vs-vault&docid=Nk0V3oUqY8XEfM&tbnid=mtw7NHWuEy_GaM%3A&vet=10ahUKEwj1nofKk7bnAhXHG80KHdsQAKsQMwhPKAAwAA..i&w=200&h=200&bih=937&biw=1920&q=AWS%20secrets%20manager%20logo%20image%20link&ved=0ahUKEwj1nofKk7bnAhXHG80KHdsQAKsQMwhPKAAwAA&iact=mrc&uact=8" width="320" alt="Kinesis Logo" />
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

### Use the Publisher

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
