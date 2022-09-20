import { Box, Button, Container, FormControl, TextField } from '@mui/material';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = (data) => {
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json().then((data) => console.log(data)));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm();

  return (
    <div>
      <Head>
        <title>API routes</title>
      </Head>

      <Container maxWidth='sm'>
        <Box>
          <h1>The Home Page</h1>
        </Box>
        <form onSubmit={handleSubmit(submitFormHandler)}>
          <FormControl>
            <TextField
              sx={{ mb: 2 }}
              {...register('email', { required: true })}
              id='my-email'
              label='Email'
              required
              variant='outlined'
              inputRef={emailInputRef}
            />
            <TextField
              sx={{ mb: 2 }}
              {...register('feedback', { required: true })}
              id='my-feedback'
              label='Your feedback'
              multiline
              rows={4}
              variant='standard'
              inputRef={feedbackInputRef}
            />

            <Button variant='standard' type='submit'>
              Send feedback
            </Button>
          </FormControl>
        </form>
      </Container>
    </div>
  );
}

export default HomePage;
