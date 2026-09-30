/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ENABLE_MOCK_DATA: string;
  readonly VITE_ENABLE_PWA_INSTALL: string;
  readonly VITE_ENABLE_OFFLINE_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
