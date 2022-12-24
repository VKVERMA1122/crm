import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CustomerFrom = () => {
  let navigate = useNavigate();
  const [salesAgentData, setSalesAgentData] = useState();
  const [currentSalesAgent, setCurrentSalesagent] = useState();
  const { setAuth } = useAuth();

  const handleChange = (event) => {
    setCurrentSalesagent(event.target.value);
  };
  useEffect(() => {
    const getSalesAgentData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/user/admin/getAllAgentName/TL1"
        );
        const data = await res.data;
        setSalesAgentData(data);
        console.log(data);
      } catch (error) {
        // Handle errors
        console.log(error);
      }
    };
    getSalesAgentData();
  }, []);
  const coustomerInfo = (e) => {
    e.preventDefault();
    let newCustomer = {
      name: e.target.userName.value,
      phone: e.target.phoneNo.value,
      salesAgent: currentSalesAgent,
      project: e.target.project.value,
      comment: e.target.comment.value,
    };
    sendCoustomerInfo(newCustomer);
  };

  const sendCoustomerInfo = async (newCustomer) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/customer/admin",
        newCustomer
      );
      console.log(res);
      console.log(newCustomer);
      navigate("/Dash/Main");
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };
  const userSignOut = async () => {
    setAuth("");
    try {
      const res = await axios.post("http://localhost:8000/user/logout");
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };

  return (
    <Box>
      <Link to="/Dash/Main">Home</Link>
      <Button sx={{ marginLeft: "5px" }} onClick={userSignOut}>
        Sign Out
      </Button>
      {salesAgentData === undefined ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={coustomerInfo}
        >
          <TextField
            label="Name"
            type={"text"}
            variant="outlined"
            name="userName"
          />
          <TextField
            type={"text"}
            label="Phone"
            variant="outlined"
            name="phoneNo"
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Sales Agent
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentSalesAgent}
              label="Age"
              onChange={handleChange}
            >
              {salesAgentData.map((agent) => (
                <MenuItem key={agent} value={agent}>
                  {agent}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type={"text"}
            label="Project"
            variant="outlined"
            name="project"
          />
          <TextField label="Comment" multiline rows={4} name="comment" />

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CustomerFrom;
