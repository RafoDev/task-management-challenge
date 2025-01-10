import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.VITE_GQL_API as string;
const token = `Bearer ${process.env.VITE_GQL_API_TOKEN}`;

const config: CodegenConfig = {
  schema: [
    {
      [baseUrl]: {
        headers: {
          Authorization: token,
        },
      },
    },
  ],
  documents: "src/**/*.graphql",
  generates: {
    "src/types.ts": { plugins: ["typescript"] },
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.tsx",
        baseTypesPath: "types.ts",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
    },
  },
};
export default config;
