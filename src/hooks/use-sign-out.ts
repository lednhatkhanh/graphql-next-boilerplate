import { useRouter } from 'next/router';
import { tokenManager } from 'src/utils';

export function useSignOut() {
  const router = useRouter();

  function signOut() {
    tokenManager.remove();
    router.replace('/auth/sign-in');
  }

  return signOut;
}
