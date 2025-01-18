import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Count MEAT',
  webDir: 'www',
  "plugins": {
		"Keyboard": {
		"resize": "none"
	}
  }
};

export default config;
