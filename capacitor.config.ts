import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic-app-base',
  webDir: 'dist',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '380616313043-r5td0lbf0ecsbd6984ve3vhro1ftm59g.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;

