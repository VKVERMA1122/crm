import { FastForward, Label } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useAuth from "../hooks/useAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "580px",
  height: "510px",
  bgcolor: "background.paper",
  border: "1px solid grey",
  boxShadow: 2,
  p: 4,
  borderRadius: "5px",
};

const Disposal = ({ data_id }) => {
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [despositionList, setDespositionList] = useState();
  const [disposition, setDisposition] = useState();
  const [comment, setComment] = useState();
  const { auth } = useAuth();
  const getLeadsData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/desposition/${data_id}`
      );
      const data = await res.data;
      setDespositionList(data);
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };
  useEffect(() => {
    getLeadsData();
  }, []);
  //console.log(despositionList);
  const handleDisposition = (e) => {
    setDisposition(e.target.value);
  };

  const submitDisposition = async () => {
    const disData = {
      userId: auth?.userDetailForFront?.userId,
      desposition: disposition,
      comment: comment,
    };
    try {
      const res = await axios.post(
        `http://localhost:8000/desposition/${data_id}`,
        disData
      );
      const data = await res.data;
      setOpen(false);
      console.log(data);
      getLeadsData();
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };
  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Open modal
      </Button>
      {despositionList === undefined ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            "& > .MuiBackdrop-root": {
              backgroundColor: "transparent",
              backdropFilter: "blur(0.3px)",
            },
          }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Sales Lead Disposal --{data_id}
              <IconButton
                onClick={() => {
                  setOpen(false);
                }}
                sx={{ marginLeft: "215px", marginTop: "-20px" }}
              >
                <CloseIcon />
              </IconButton>
            </Typography>

            <Button variant="outlined" sx={{ mt: 1 }}>
              Progress
            </Button>

            <Box id="modal-modal-description" sx={{ mt: 1 }}>
              <Typography variant="h6">Disposition</Typography>
              <FormControl fullWidth sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">
                  Select Disposition
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Disposition"
                  onChange={handleDisposition}
                >
                  <MenuItem value={"Tele Metting Done"}>
                    Tele Metting Done
                  </MenuItem>
                  <MenuItem value={"Call Back"}>Call Back</MenuItem>
                  <MenuItem value={"Final Negotiation (FN) Done"}>
                    Final Negotiation (FN) Done
                  </MenuItem>
                  <MenuItem value={"Final Negotiation (FN) Planned"}>
                    Final Negotiation (FN) Planned
                  </MenuItem>
                  <MenuItem value={"Final Negotiation (FN) Postponed"}>
                    Final Negotiation (FN) Postponed
                  </MenuItem>
                  <MenuItem value={"Metting (F2F) Done"}>
                    Metting (F2F) Done
                  </MenuItem>
                  <MenuItem value={"Metting (F2F) Planned"}>
                    Metting (F2F) Planned
                  </MenuItem>
                  <MenuItem value={"Metting (F2F) Postponed"}>
                    Metting (F2F) Postponed
                  </MenuItem>
                  <MenuItem value={"Not Contactable"}>Not Contactable</MenuItem>
                  <MenuItem value={"Not Interested"}>Not Interested</MenuItem>
                  <MenuItem value={"Site Vist (SV) Done"}>
                    Site Vist (SV) Done
                  </MenuItem>
                  <MenuItem value={"Site Vist (SV) Planned"}>
                    Site Vist (SV) Planned
                  </MenuItem>
                  <MenuItem value={"Site Vist (SV) Postponed"}>
                    Site Vist (SV) Postponed
                  </MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ marginTop: "5px" }}>
                <Typography variant="h6">Comment</Typography>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Enter Comment"
                  style={{
                    minWidth: "100%",
                    maxWidth: "100%",
                    minHeight: "70px",
                    maxHeight: "70px",
                    resize: "none",
                  }}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Box>

              <TableContainer
                component={Paper}
                sx={{ marginTop: "10px", height: "120px" }}
              >
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Disposition
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Sub Disposition
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Comment
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {despositionList.map((data) => (
                      <TableRow
                        key={data._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": {
                            backgroundColor: "whitesmoke",
                          },
                        }}
                      >
                        <TableCell align="center">{data.userId}</TableCell>
                        <TableCell align="center">{data.desposition}</TableCell>
                        <TableCell align="center">{data.comment}</TableCell>
                        <TableCell align="center">
                          {data.despositionAt}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="contained"
                sx={{
                  marginTop: "10px",
                  marginLeft: "330px",
                  marginBottom: "0px",
                }}
                onClick={submitDisposition}
              >
                Submit
              </Button>

              <Button
                variant="contained"
                color="error"
                sx={{
                  marginTop: "10px",
                  marginLeft: "5px",
                  marginBottom: "0px",
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default Disposal;
