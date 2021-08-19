import '../styles/globals.css'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';

const isLocalhost = false;

const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsconfig.oauth.redirectSignIn.split(",");

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsconfig.oauth.redirectSignOut.split(",");

// const updatedAwsConfig = awsconfig;
const updatedAwsConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  }
}

console.log(JSON.stringify(updatedAwsConfig.oauth))

Amplify.configure({
  ...updatedAwsConfig,
  ssr: true}
);

Auth.configure(updatedAwsConfig);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
