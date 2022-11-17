import React, { Component, useState, useEffect } from "react";
import Axios from 'axios'

import Button from "@mui/material/Button";

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import { Stack } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link, Redirect, Switch, Route, useNavigate } from "react-router-dom";

// import Button 
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import NavigationIcon from '@mui/icons-material/Navigation';
import { render } from "enzyme";

// import Popup
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Overlay from "react-overlay-component";
import { borderRadius } from "@mui/system";





// const GUEST_RESERVATIONS = [
//     {
//         id: 0,
//         name: "Arnold Schwarzenegger",
//         date: "January 1, 2023, 5:00pm",
//     },
//     {
//         id: 1,
//         name: "Dwayne Johnson",
//         date: "March 5, 2022, 8:00am",
//     },
//     {
//         id: 2,
//         name: "Michael Tyson",
//         date: "December 25, 2025, 9:30am",
//     },
//     {
//         id: 3,
//         name: "Alex Louis Armstrong",
//         date: "June 30, 2022, 12:00pm",
//     },

// ]

// const HOST_RESERVATIONS = [
//     {
//         id: 0,
//         name: "Average Joes",
//         date: "January 30, 2023, 5:00pm",
//     },
//     {
//         id: 1,
//         name: "Major Gains",
//         date: "October 5, 2022, 8:00am",
//     },
//     {
//         id: 2,
//         name: "Jims Gym",
//         date: "April 25, 2025, 9:30am",
//     },
//     {
//         id: 3,
//         name: "Heavy Iron",
//         date: "January 30, 2022, 12:00pm",
//     },
// ]

// function ReservationCard(props){
//     return <div>
//         <div className="ReservationCard">
//             <div className="ReserveComps">
//                 <h2>{props.name}</h2>
//                 <h2>{props.date}</h2>    
//             </div>
//             <div className="ReserveComps">
//                 <button className="Button">View Gym</button>
//                 <button className="Button">Directions</button>
//                 <button className="Button">Manage Reservation</button>
//             </div>
//         </div>
//     </div>
// }

// function ReservationList(props){
//     return <div>
//         {props.reserves.map(reserves =>(
//             <ReservationCard 
//             key={reserves.id}
//             name={reserves.name}
//             date={reserves.date}
//             />
//         ))}
//     </div>
// }


// function ReservationPanel(props){
//     return(
//     <div className="ReservationListPanel">  
//         <h1 className='CenterText'>{props.title}</h1>
//         <ReservationList reserves={props.reserves}/>
//     </div> 
//     )      
// }

function TabPanel(props2) {
	const { children, value, index, ...other } = props2;

	return ( <Typography
		component="div"
		role="tabpanel"
		hidden={value !== index}
		id={`action-tabpanel-${index}`}
		aria-labelledby={`action-tab-${index}`}
		{...other}>
		{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
	</Typography>);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `action-tab-${index}`,
		'aria-controls': `action-tabpanel-${index}`,
	};
}

function Item(props) {
	return null;
}

Item.propTypes = {children: PropTypes.node};


const UserReservations = (props) => {
    
    const[guestReservations, setGuestReservations] = useState([]);
    const[hostReservations, setHostReservations] = useState([]);
    const[guestLoading, setGuestLoading] = useState(true);
    const[hostLoading, setHostLoading] = useState(true);

    // Size for info reservation
    const fontStyle = {fontSize: '23px'}

    // Tab
    const theme = useTheme();
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => { setValue(newValue); };
	const handleChangeIndex = (index) => { setValue(index); };
	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));

    // Creating Pop Up for Review
    const [isOpen, setOverlay] = useState(false);

    const closeOverlay = () => setOverlay(false);

    // Creating Pop Up for Map
    const [isOpen2, setOverlay2] = useState(false);

    const closeOverlay2 = () => setOverlay2(false);

    const configs = {
        animate: true,
        // clickDismiss: false,
        // escapeDismiss: false,
        // focusOutline: false,
    };
    // Rating
    const [review, setReview] = React.useState(2);

    // Redirect to direction map
    const navigateToMap = () => {
        
        //<Link to="https://www.google.com/maps/dir//6000+J+Street,+Sacramento,+CA+95819" />
    //    <a href="https://www.google.com/maps/dir//6000+J+Street,+Sacramento,+CA+95819"></a>
        const link = `https://www.google.com/maps/dir//6000+J+Street,+Sacramento,+CA+95819`
        window.open(link, "_blank");
    };
    
    const getDirections = (gymId) => {
        let gym = 'http://localhost:3001/api/getGym/' + gymId;
        Axios.get(gym).then((response) => {
            var directionsString = '';
            directionsString += response.data.get_Gym.address.street1 +'+'+ response.data.get_Gym.address.State + '+' + response.data.get_Gym.address.zipcode ;
            //redirect with the directions string here
            var link = `https://www.google.com/maps/dir//`+ directionsString
            window.open(link, "_blank");

            console.log(directionsString)
            console.log(link)
        })
    }

    // Calling API data from Backend
    useEffect(() => {

		let str = 'http://localhost:3001/api/getReservationUser/' + props.userId
        Axios.get(str).then((response) => {
            setGuestReservations(response.data.list_GymReservationItems._GymReservationItems);
            setGuestLoading(false);
        })
        for (let i=0; i<props.userGyms.list_GymItems._GymItems.length; i++) {
            let str = 'http://localhost:3001/api/getReservationGym/' + props.userGyms.list_GymItems._GymItems[i]._id
            Axios.get(str).then((response) => {
                for (let j=0; j<response.data.list_GymReservationItems._GymReservationItems.length; j++) {
                    setHostReservations(prevState => [...prevState, response.data.list_GymReservationItems._GymReservationItems[j]])
                }
                setHostLoading(false);
            })
        }

    },[]);

    function CancelGymReservation (reservationID, time, gym) {
        try {
            Axios.post('http://localhost:3001/api/CancelReservation', 
                {params: {id: reservationID, timeSlot: time, gymId: gym}})
            .then(() => this.setState({ status: 'Gym Reservation Cancellation successful' }));
        } catch (err) { console.log(err) }
    }
    
    return (
        // <div className="reservation-area">
        //     <ReservationPanel title='Guest Reservations' reserves={GUEST_RESERVATIONS}/>
        //     <ReservationPanel title='Host Reservations' reserves={HOST_RESERVATIONS}/>
        // </div>
        <div>
            {/* {(!guestLoading && !hostLoading) ?
                <>
                <div>
                    <b>These are reservations that you have booked as a guest</b><br></br>
                    {guestReservations.map( gresv => <>{gresv.gymName} <br></br> {(new Date(gresv.timeSlot)).toLocaleString()} <br></br></>)}
                </div>
                <div>
                    <b>These are the reservations that other guests have booked at your gyms</b><br></br>
                    {hostReservations.map( hresv => <>{hresv.gymName} <br></br> {(new Date(hresv.timeSlot)).toLocaleString()} <br></br></>)}
                </div>
                </>
            : <>loading...</>} */}
            

            {/* --------Popup Review-------- */}
            <Overlay configs={configs} isOpen={isOpen} closeOverlay={closeOverlay}>
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                            bgcolor: 'background.paper',
                        }}
                    >
                    <Typography component="legend">Rating</Typography>
                    <Rating
                        name="simple-controlled"
                        value={review}
                        onChange={(event, newValue) => {
                        setReview(newValue);
                        }}
                    />                             
                    <br></br>
                    <textarea placeholder="What's your feedback?"/>
                    <br></br>
                    <Button variant="contained" >Submit</Button>                  
                    </Box>
            </Overlay>            

            {/*------------ Tab -----------*/}
            <div className='helpsection'> 
            <Box sx={{
                bgcolor: 'background.paper',
            }}>  
            <h1 className='title-helpsection'>Reservation</h1>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="action tabs example"
                >
                    <Tab label="For Users" {...a11yProps(0)} />
                    <Tab label="For Hosts" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews 
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Box sx={{ flexGrow: 1 }}><Grid container spacing={3}>
                        <Grid item xs>
                            {/*---------- Guest Reservation ----------*/}
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>GYM</TableCell>
                                                <TableCell align="right">Time</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {console.log(guestReservations)}
                                            {guestReservations.map((gresv) => (
                                                <TableRow
                                                    key={(new Date(gresv.timeSlot)).toLocaleString()}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                   <Link to={{pathname: "/ViewGym", props: gresv.gymId}}>
                                                        <TableCell style={fontStyle} component="th" scope="row">
                                                            {gresv.gymName}
                                                        </TableCell>
                                                    </Link>
                                                    <TableCell style={fontStyle} align="right">
                                                       {(new Date(gresv.timeSlot)).toLocaleString()} 
                                                    </TableCell>
                                                    
                                                    {/*------------ Adding button  ------------ */}
                                                    {
                                                    (gresv.timeSlot < new Date().toJSON()) ? 
                                                        <Fab color="primary" aria-label="edit">
                                                            <EditIcon onClick={ event => {
                                                                setOverlay(true);

                                                            }} />
                                                        </Fab>
                                                        
                                                        : <Fab variant="extended">
                                                        <NavigationIcon onClick={() => getDirections(gresv.gymId)} sx={{ mr: 1 }} />
                                                        Navigate
                                                        </Fab>                     
                                                    }
                                                    <Button 
                                                        size="small" 
                                                        variant="contained" 
                                                        onClick={() => CancelGymReservation(gresv._id, gresv.timeSlot, gresv.gymId)}>
                                                        Cancel Reservation
                                                    </Button>    
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                        </Grid>
                    </Grid></Box>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Box sx={{ flexGrow: 1 }}><Grid container spacing={3}>
                        {/*---------- Host Reservation ----------*/}
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>GYM</TableCell>
                                        <TableCell  align="right">Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {hostReservations
                                    .sort((a,b) => a.timeSlot > b.timeSlot ? 1 : -1)
                                    .map((hresv) => (
                                        <TableRow
                                            key={(new Date(hresv.timeSlot)).toLocaleString()}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <Link to={{pathname: "/ViewGym", props: hresv.gymId}}>
                                                <TableCell style={fontStyle} component="th" scope="row">
                                                    {hresv.gymName}
                                                </TableCell>
                                            </Link>
                                            
                                            <TableCell style={fontStyle} align="right">{(new Date(hresv.timeSlot)).toLocaleString()}</TableCell>
                                            {/*------------ Adding button  ------------ */}
                                            {/* {
                                                (hresv.timeSlot < new Date().toJSON()) ? 
                                                    <Fab color="primary" aria-label="edit">
                                                        <EditIcon />
                                                    </Fab>
                                                    : <Fab variant="extended">
                                                    <NavigationIcon sx={{ mr: 1 }} />
                                                        Navigate
                                                    </Fab>
                                            } */}
                                            {
                                                {/*
                                                <Button 
                                                    size="small" 
                                                    variant="contained" 
                                                    onClick={() => CancelGymReservation(hresv._id, hresv.timeSlot, hresv.gymId)}>
                                                    Cancel Reservation
                                                </Button>
                                                */}
                                            }
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    </Box>
                </TabPanel>
            </SwipeableViews>
            </Box>
            </div> 
        </div>

            
    )
}
export default UserReservations;