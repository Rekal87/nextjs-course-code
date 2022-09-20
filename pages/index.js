import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <Head>
        <title>API routes</title>
      </Head>

      <Container maxWidth='sm'>
        <Box>
          <h1>The Home Page</h1>
        </Box>
        <FormControl>
          <TextField id='my-email' label='Email' variant='outlined' />
          <TextField
            sx={{ mb: 2 }}
            id='my-feedback'
            label='Your feedback'
            multiline
            rows={4}
            variant='standard'
          />
          <Button variant='standard'>Send feedback</Button>
        </FormControl>
      </Container>
    </div>
  );
}

export default HomePage;
