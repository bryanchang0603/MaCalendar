import React from 'react';
import clsx from 'clsx';
import { makeStyles,  MuiThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ShareIcon from '@material-ui/icons/Share';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Icon } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import TextField from '@material-ui/core/TextField';
import Sendmail from "./Sendmail";
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from '@material-ui/core';
import customTheme from "../App"

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function Share(props) {

  const rows = props.event;
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
  });

  const [checked, setChecked] = React.useState(true);

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >

      <List>
          <ListItem>
            <ListItemIcon><ShareIcon/></ListItemIcon>
            <ListItemText primary = {"Share with your frineds"}/>
          </ListItem>

      </List>
      <Divider />
      <List>
          <MuiThemeProvider theme={customTheme}>
          <ListItem >
            <ListItemIcon><EmailIcon/></ListItemIcon>
            <Sendmail events={rows}/>
          </ListItem>
          </MuiThemeProvider>
      </List>
      <List>
          <ListItem >
            <ListItemText>Events<Divider/></ListItemText>
          </ListItem>
          <ListItem>{
            rows.map((row) =>{
              return <ListItemText key={row.id}>{row.title}</ListItemText>})
              }
            </ListItem>
            <ListItem>{
            rows.map((row) =>{
              const week = ["Sun ","Mon ","Tue ","Wed ","Thu ","Fri ","Sat "]
              const startDate = week[row.startDate.getDay()]+row.startDate.toTimeString().substring(0,5)
              const endDate = week[row.endDate.getDay()]+row.endDate.toTimeString().substring(0,5)
              return <ListItemText key={row.id}>From {startDate}</ListItemText>})
              }
            </ListItem>
            <ListItem>{
            rows.map((row) =>{
              const week = ["Sun ","Mon ","Tue ","Wed ","Thu ","Fri ","Sat "]
              const startDate = week[row.startDate.getDay()]+row.startDate.toTimeString().substring(0,5)
              const endDate = week[row.endDate.getDay()]+row.endDate.toTimeString().substring(0,5)
              return <ListItemText key={row.id}>To {endDate}</ListItemText>})
              }
            </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem className = "">
              <IconButton onClick={event =>  window.location.href='https://www.facebook.com/'}><FacebookIcon /></IconButton>
              <IconButton onClick={event =>  window.location.href='https://www.linkedin.com/'}><LinkedInIcon /></IconButton>
              <IconButton onClick={event =>  window.location.href='https://www.instagram.com/'}><InstagramIcon /></IconButton>
          </ListItem>
      </List>
    </div>
  );
  return (

    <div>
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
        <Tooltip title="Share"><IconButton onClick={toggleDrawer(anchor, true)} aria-label="display more actions" edge="end" color="inherit"><ShareIcon /></IconButton></Tooltip>
          <Drawer anchor={'top'} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}





export default Share;
