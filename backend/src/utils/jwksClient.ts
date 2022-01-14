import Axios from 'axios';
import { createLogger } from '../utils/logger';

const jwksUrl = process.env.JWKS_URL;
const logger = createLogger('Todo')

export async function getSigningKey(kid: string) {
    try{
      const reply = await Axios.get(jwksUrl, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Credentials': 'true',
        }
      });
      const keys: any[] = reply.data.keys
      const key = keys.find(key => key.kid === kid && key.kty === 'RSA')

      if (!key) {
        throw new Error('Key not found')
      }
      return key.x5c[0]
    }
    catch(e) {
      logger.info("getSigningKey",e)
    }
  }
  