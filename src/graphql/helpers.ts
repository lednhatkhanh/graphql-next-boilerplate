import { FieldPolicy, FieldReadFunction, TypePolicies } from '@apollo/client/cache';
export type AuthResponseKeySpecifier = ('token' | 'issuedAt' | 'expiresIn' | AuthResponseKeySpecifier)[];
export type AuthResponseFieldPolicy = {
  token?: FieldPolicy<any> | FieldReadFunction<any>;
  issuedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresIn?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = ('email' | 'name' | 'bio' | 'id' | 'imageUrl' | UserKeySpecifier)[];
export type UserFieldPolicy = {
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  bio?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  imageUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = ('me' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
  me?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = ('signIn' | 'signUp' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
  signIn?: FieldPolicy<any> | FieldReadFunction<any>;
  signUp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TypedTypePolicies = TypePolicies & {
  AuthResponse?: {
    keyFields?: false | AuthResponseKeySpecifier | (() => undefined | AuthResponseKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: AuthResponseFieldPolicy;
  };
  User?: {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: UserFieldPolicy;
  };
  Query?: {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: QueryFieldPolicy;
  };
  Mutation?: {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: MutationFieldPolicy;
  };
};
