import { Box, Button, Container, FormControl, TextField } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRef } from 'react';

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    fetch(); // { email: "test@test.com", text: "Some feedback text" }
  }

  return (
    <div>
      <Head>
        <title>API routes</title>
      </Head>

      <Container maxWidth='sm'>
        <Box>
          <h1>The Home Page</h1>
        </Box>
        <FormControl onSubmit={submitFormHandler}>
          <TextField
            id='my-email'
            label='Email'
            variant='outlined'
            ref={emailInputRef}
          />
          <TextField
            sx={{ mb: 2 }}
            id='my-feedback'
            label='Your feedback'
            multiline
            rows={4}
            variant='standard'
            ref={feedbackInputRef}
          />
          <Button variant='standard'>Send feedback</Button>
        </FormControl>
      </Container>
    </div>
  );
}

export default HomePage;
