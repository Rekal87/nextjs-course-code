import { Box, Button, Container, FormControl, TextField } from '@mui/material';
import Head from 'next/head';
import { useRef } from 'react';

function HomePage() {
  const emailInputRef = useRef(null);
  const feedbackInputRef = useRef(null);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };
    console.log('reqBody: ' + reqBody);

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json().then((data) => console.log(data)));
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
        <form onSubmit={submitFormHandler}>
          <FormControl>
            <TextField
              sx={{ mb: 2 }}
              id='my-email'
              label='Email'
              required={true}
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
