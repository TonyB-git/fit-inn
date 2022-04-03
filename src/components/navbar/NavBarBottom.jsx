import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { createTheme } from '@mui/material/styles';
import "./NavBarBottom.css";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    CssBaseline,
    makeStyles,
    useTheme,
    useMediaQuery,
    Link,
    Button,
  } from "@material-ui/core";

  const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(5),
      display: "flex",
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "15px",
      "&:hover": {
        color: "yellow",
        cursor: "pointer",
      },
    },
  }));

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AppBar position="static">
    <CssBaseline />
      <Toolbar>
        <Typography variant="h6" className={classes.navlinks}>
          <div className={classes.link}>Help Center</div>
          </Typography>
          <Typography variant="h6" className={classes.navlinks}>
          <div className={classes.link}>Terms of Use</div>
          </Typography>
          <Typography variant="h6" className={classes.navlinks}>
          <div className={classes.link}>Privacy Policy</div>
        </Typography>

        <div className = "SocialMediaIcons">
            <BottomNavigationAction className={classes.link} label="Facebook" icon={<FacebookIcon style={{ fill: 'white' }} />} href="#"/>
            <BottomNavigationAction className={classes.link} label="Twitter" icon={<TwitterIcon style={{ fill: 'white' }}/>} href="#"/>
            <BottomNavigationAction className={classes.link} label="Instagram" icon={<InstagramIcon style={{ fill: 'white' }}/>} href="#"/>
        </div>
      </Toolbar>
    </AppBar>
  );
}