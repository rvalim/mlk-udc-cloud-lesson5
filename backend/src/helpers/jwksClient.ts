import { Axios } from 'axios';
import { createLogger } from '../utils/logger';

const logger = createLogger('Todo')
const jwksUrl = 'https://dev-kp18twnv.us.auth0.com/.well-known/jwks.json'

export async function getSigningKey(kid: String): Promise<string> {
  logger.info('get Signing key', {'kid': kid})
  const response = await new Axios().get(jwksUrl)
  logger.info('Received response ', {'url': jwksUrl, 'response': JSON.stringify(response)})
  if (response.status != 200) {
      logger.error('Error get signing-key', {'err': JSON.stringify(response)})
      throw new Error(response.statusText)
  }
  const secret = response.data.keys.fiter(key => {
      key.kid = kid
  }).x5c
  logger.info('Filtered secret from response', {'secret': secret})
  if (!secret) {
      logger.error('Error fetching secret')
      throw new Error('Error fetching secret')
  }
  return secret
}
