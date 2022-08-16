import React, { useState, useRef } from "react";
import {
  Box,
  Grid,
  Container,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CSVLink } from "react-csv";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isPresent, setIsPresent] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  const [csvData, setCsvData] = useState([]);
  const csvLink = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setCsvData([
      ...csvData,
      [`name: ${name}`, `email: ${email}`, `Present: ${isPresent}`],
    ]);
    setSubmittedData((oldSubmittedData) => [
      ...oldSubmittedData,
      { name, email, isPresent },
    ]);
    setName("");
    setEmail("");
    setIsPresent(false);
  };

  const handleCsvDownload = () => {
    csvData.length
      ? csvLink.current.link.click()
      : window.alert("Please submit some items first");
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
                label="Is Present?"
                checked={isPresent}
                onChange={() => setIsPresent(!isPresent)}
                control={<Checkbox id="is-present-input" />}
              />
            </FormGroup>
          </Grid>
          <Grid container item xs={4} gap={1}>
            <Button type="submit" variant="contained">
              Add Item
            </Button>

            <Button
              color="secondary"
              variant="contained"
              onClick={handleCsvDownload}
            >
              Download CSV
            </Button>

            <CSVLink
              data={csvData}
              ref={csvLink}
              filename="form-data.csv"
              target="_blank"
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Present</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submittedData.map((data) => (
                <TableRow>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.isPresent ? "True" : "False"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default Form;
