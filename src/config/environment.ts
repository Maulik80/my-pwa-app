export const config = {
  appName: import.meta.env.VITE_APP_NAME || 'SKPT Cricket',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  enableMockData: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
  enablePwaInstall: import.meta.env.VITE_ENABLE_PWA_INSTALL === 'true',
};
