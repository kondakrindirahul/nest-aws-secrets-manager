import { Injectable, Logger } from '@nestjs/common';
import { AWS } from 'aws-sdk';

@Injectable()
export class SecretsManager {
  private readonly baseLogger: Logger;
  secretName: string;
  region: string;
  decodedBinarySecret: string;
  credentials: AWS.SharedIniFileCredentials;
  client: any;

  constructor(
    secretName: string,
    region: string,
    profile: string,
  ) {
    this.baseLogger = new Logger(SecretsManager.name);
    this.secretName = secretName;
    this.region = region;
    this.credentials = new AWS.SharedIniFileCredentials({ profile });

    // Create a Secrets Manager client
    this.client = new AWS.SecretsManager({
      region: this.region,
      credentials: this.credentials,
    });
  }

  getCredentials() {
    return new Promise<string>((resolve, reject) => {

      this.client.getSecretValue({SecretId: this.secretName}, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        if ('SecretString' in data) {
          resolve(data.SecretString);
          return;
        } else {
          reject(new Error('Could not find SecretString'));
          return;
        }
      });
    });
  }
}
