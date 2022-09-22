import {
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState([]);

  function showDetails(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <Fragment>
      <Container maxWidth='sm'>
        <Box p={4} my={3} sx={{ backgroundColor: '#fff' }}>
          {props.feedbackItems.map((item) => (
            <List key={item.id}>
              <ListItem>
                <ListItemText primary={item.text} />
                <Button onClick={showDetails.bind(null, item.id)}>
                  Show details
                </Button>
              </ListItem>
            </List>
          ))}
        </Box>
        <Box p={4} sx={{ backgroundColor: '#fff' }}>
          {feedbackData && <Typography>{feedbackData.email}</Typography>}
        </Box>
      </Container>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
