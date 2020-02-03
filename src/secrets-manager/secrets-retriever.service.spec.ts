import { AWSError, Request, SecretsManager } from 'aws-sdk';

import { AWS_SECRETS_MANAGER_TOKEN } from './tokens';
import { GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager';
import { SecretsRetrieverService } from './secrets-retriever.service';
import { Test } from '@nestjs/testing';

interface UserTest {
  name: string;
  isAwesome: boolean;
}

describe('SecretsRetrieverService', () => {
  let subject: SecretsRetrieverService;
  let secretsManager: SecretsManager;
  let spy: jest.SpyInstance<
    Request<GetSecretValueResponse, AWSError>,
    [((err: AWSError, data: SecretsManager.GetSecretValueResponse) => void)?]
  >;
  let responseObj: UserTest;
  beforeEach(async () => {
    const testBed = await Test.createTestingModule({
      providers: [
        SecretsRetrieverService,
        {
          provide: AWS_SECRETS_MANAGER_TOKEN,
          useValue: {
            getSecretValue: (obj: any) => null,
          },
        },
      ],
    }).compile();
    subject = testBed.get<SecretsRetrieverService>(SecretsRetrieverService);
    secretsManager = testBed.get(AWS_SECRETS_MANAGER_TOKEN);
    spy = jest.spyOn(secretsManager, 'getSecretValue');
    responseObj = {
      name: 'Ben',
      isAwesome: true,
    };
  });

  describe('getSecret()', () => {
    it('should get secrets from aws', async () => {
      const spyResponse = {
        abort: null,
        createReadStream: null,
        eachPage: null,
        isPageable: null,
        on: null,
        send: null,
        onAsync: null,
        startTime: null,
        httpRequest: null,
        promise: () =>
          Promise.resolve({
            $response: null,
            SecretString: JSON.stringify(responseObj),
          }),
      };
      spy.mockReturnValue(spyResponse);
      const secret = 'bestCoder';
      const actualSecret = await subject.getSecret<UserTest>(secret);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ SecretId: secret });
      expect(actualSecret).toEqual(responseObj);
      expect(actualSecret.name).toEqual('Ben');
    });
  });
});
