import { Alert, Box, Container, Paper, TextField, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import Head from 'next/head';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import { SignInMutationVariables, useSignInMutation } from 'src/graphql';
import { tokenManager } from 'src/utils';

export default function SignInPage() {
  const router = useRouter();
  const form = useForm<FormData>({ resolver: formResolver, defaultValues: formDefaultValues });
  const [signInMutation, { error: signInError, loading: isSigningIn }] = useSignInMutation({
    onError(error) {
      console.log(error);
    },
    onCompleted({ signIn }) {
      tokenManager.save(signIn);
      router.replace('/');
    },
  });

  function handleFormSubmit(data: FormData) {
    signInMutation({ variables: data });
  }

  return (
    <>
      <Head>
        <title>Graphql Next - Sign in</title>
      </Head>

      <Box sx={{ height: '100vh', placeItems: 'center', display: 'grid' }}>
        {(props) => (
          <Container {...props} component="main">
            <Box
              component={Paper}
              sx={{
                width: { xs: '100%', sm: '50%', md: '33%', lg: '25%' },
                padding: (theme) => theme.spacing(4, 2),
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: (theme) => theme.spacing(2) }}>
                {(props) => (
                  <form {...props} onSubmit={form.handleSubmit(handleFormSubmit)} noValidate>
                    {signInError ? <Alert severity="error">{signInError.message}</Alert> : null}

                    <Typography component="h1" variant="h6" align="center">
                      Sign in
                    </Typography>

                    <TextField
                      inputRef={form.register}
                      error={!!form.errors.email}
                      helperText={form.errors.email?.message}
                      name="email"
                      id="email"
                      type="email"
                      label="Email"
                      variant="filled"
                      fullWidth
                      required
                    />

                    <TextField
                      inputRef={form.register}
                      error={!!form.errors.password}
                      helperText={form.errors.password?.message}
                      name="password"
                      id="password"
                      type="password"
                      label="Password"
                      variant="filled"
                      fullWidth
                      required
                      inputProps={{ minLength: 6 }}
                    />

                    <LoadingButton pending={isSigningIn} type="submit" variant="contained" fullWidth>
                      Sign in
                    </LoadingButton>
                  </form>
                )}
              </Box>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
}

type FormData = SignInMutationVariables;

const validationSchema = yup.object().shape<FormData>({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const formResolver = yupResolver<FormData>(validationSchema);

const formDefaultValues: FormData = {
  email: '',
  password: '',
};
