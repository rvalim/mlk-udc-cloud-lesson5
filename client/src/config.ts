// Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'ewrdz6nref'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-kp18twnv.us.auth0.com',                    // Auth0 domain
  clientId: 'mxd2CVi6z8yBgKQRDmdUZ5Vaj0Y9zp1l',           // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
