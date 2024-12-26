/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GQL_API: string;
  readonly VITE_GQL_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}