import {
  Box,
  Button,
  Container,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const [feedbackItems, setFeedbackItems] = useState([]);

  /**
   *
   * @param {*} data
   * @example
   * const test = "hei"
   */
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

  function loadFeedbackHandler() {
    fetch('/api/feedback').then((response) =>
      response.json().then((data) => setFeedbackItems(data.feedback))
    );
  }

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
        <Box sx={{ textAlign: 'center' }}>
          <h1>The Home Page</h1>
        </Box>
        <Box p={4} mb={3} sx={{ backgroundColor: '#fff' }}>
          <Box mb={3}>
            <Typography variant='h5'>Your feedback</Typography>
          </Box>
          <form onSubmit={handleSubmit(submitFormHandler)}>
            <TextField
              sx={{ mb: 2 }}
              {...register('email', { required: true })}
              id='my-email'
              label='Email'
              fullWidth
              required
              variant='outlined'
              inputRef={emailInputRef}
            />
            <TextField
              sx={{ mb: 2 }}
              {...register('feedback', { required: true })}
              id='my-feedback'
              label='Your feedback'
              fullWidth
              multiline
              rows={4}
              variant='standard'
              inputRef={feedbackInputRef}
            />
            <Button variant='standard' fullWidth={true} type='submit'>
              Send feedback
            </Button>
          </form>
        </Box>
        <Box p={4} sx={{ backgroundColor: '#fff' }}>
          <Button variant='contained' onClick={loadFeedbackHandler}>
            Load Feedback
          </Button>
          <Box my={3}>
            <Typography variant='h5'>Feedback</Typography>
          </Box>

          <Box>
            {feedbackItems.map((item) => (
              <List key={item.id}>
                <ListItem>
                  <ListItemText primary={item.text} />
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                </ListItem>
              </List>
            ))}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default HomePage;
