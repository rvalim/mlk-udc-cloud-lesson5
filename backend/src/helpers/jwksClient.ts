import { Axios } from 'axios';

const jwksUrl = 'https://dev-kp18twnv.us.auth0.com/.well-known/jwks.json'

export async function getSigningKey(kid: string) {
    const reply = await new Axios().get(jwksUrl)
    const keys: any[] = reply.data.keys
    const key = keys.find(key => key.kid === kid && key.kty === 'RSA')
    if (!key) {
      throw new Error('Key not found')
    }
    return key.x5c[0]
  }
  