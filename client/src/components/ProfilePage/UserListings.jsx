import React, {useState} from "react";
import { gql, useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import GymUploadPage from "../../pages/GymUploadPage";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from 'axios';
import { Typography, Button, Box, Container } from "@material-ui/core";
import Swal from 'sweetalert2';

const UserListings = (props) => {
    
    if (props.loading) return "Loading...";

    function DeleteGymListing(gymID) {
      Swal.showLoading();  
      try {
            Axios.post('http://localhost:3001/api/deleteGym', {id: gymID})
            .then((response) => {
              Swal.hideLoading();
              Swal.fire({confirmButtonColor: '#3F51B5', title: response.data}).then(okay => {props.setValue(0); props.setProfileUpdated(props.profileUpdated+1)})});
        } catch (error) { console.log(error); }
    } 

    return ( <div className="user-listings"> 
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>                          
                <TableCell>Gym Name</TableCell>
                {/* <TableCell>Is Active?</TableCell> */}
                <TableCell>Cost</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Zipcode</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead> 
            <TableBody>
              {props.data.list_GymItems._GymItems.map((val) => (
                <TableRow>
                    <TableCell>{val.title}</TableCell>
                    {/* <TableCell>{val.isActive}</TableCell> */}
                    <TableCell>{val.cost}</TableCell>
                    <TableCell>{val.address.street1}</TableCell>
                    <TableCell>{val.address.City}</TableCell>
                    <TableCell>{val.address.State} </TableCell>
                    <TableCell>{val.address.Country}</TableCell>
                    <TableCell>{val.address.zipcode}</TableCell>
                    <TableCell>{val.rating} Stars</TableCell>
                    <TableCell>
                      <NavLink to={{pathname: '/GymUpload', state:{ gymId: val._id }}}>
                          Update
                      </NavLink>
                    </TableCell>
                    <TableCell>
                      <Button 
                          size="small" 
                          variant="contained" 
                          color="primary" 
                          onClick={() => DeleteGymListing(val._id)}>
                          Delete
                      </Button>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table> 
    </TableContainer></div> );
}
export default UserListings;