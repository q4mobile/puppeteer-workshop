import React, { useState, useRef } from 'react';
import {
  Box,
  Grid,
  Container,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button
} from '@mui/material';
import { CSVLink } from 'react-csv';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isCat, setIsCat] = useState(false);

  const [csvData, setCsvData] = useState([]);
  const csvLink = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setCsvData([...csvData, ['name: ' + name, 'email: ' + email, 'isCat: ' + isCat]]);
    setName('');
    setEmail('');
    setIsCat(false);
  };

  const handleCsvDownload = () => {
    csvData.length ? csvLink.current.link.click() : window.alert('Please submit some items first');
  };

  return (
    <Container>
      <Box component="form" paddingTop={4} onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={4}>
            <TextField
              id="name-input"
              label="Name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="email-input"
              label="Email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormGroup>
              <FormControlLabel
                label="Is Cat?"
                checked={isCat}
                onChange={() => setIsCat(!isCat)}
                control={<Checkbox id="is-cat-input" />}></FormControlLabel>
            </FormGroup>
          </Grid>
          <Grid container item xs={4} gap={1}>
            <Button type="submit" variant="contained">
              Add Item
            </Button>

            <Button color="secondary" variant="contained" onClick={handleCsvDownload}>
              Download CSV
            </Button>

            <CSVLink
              data={csvData}
              ref={csvLink}
              filename={'form-data.csv'}
              target="_blank"></CSVLink>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Form;
