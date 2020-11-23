/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: string;
  }
}
