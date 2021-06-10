import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import HeaderIcon from '@material-ui/icons/CloudCircle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  companyName: {
    flexGrow: 1
  },
  avatar: {
    backgroundColor: red[500],
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));


export default function Home(props) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createUser = (name, email) => {
    axios.post('http://ec2-65-1-131-13.ap-south-1.compute.amazonaws.com:3000/users', {
      name,
      email
    })
      .then(function (response) {
        console.log(response);
        getUsers();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const deleteUser = (userObj) => {
    axios.delete('http://ec2-65-1-131-13.ap-south-1.compute.amazonaws.com:3000/users', {data: userObj})
      .then(function (response) {
        console.log(response);
        getUsers();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSubmit = () => {
    createUser(name, email);
    setName('');
    setEmail('');
    handleClose();
  }

  const onDelete = (data) => {
    deleteUser(data);
  }

  const getUsers = () => {
    axios.get('http://ec2-65-1-131-13.ap-south-1.compute.amazonaws.com:3000/users')
      .then(function (response) {
        // handle success
        setUsers(response.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //call on mount
  useEffect(() => {
    getUsers();
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <HeaderIcon className={classes.icon} />
          <Typography className={classes.companyName} variant="h6" color="inherit" noWrap>
            FinCloud
          </Typography>
          <FormControlLabel control={<Switch onChange={props.toggleTheme} />} label="Dark Mode" />
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container className={classes.headerContainer}>
            <Typography variant="h4" align="left" color="textSecondary">
              Users List
            </Typography>
            <Button variant="contained" color="secondary" onClick={() => handleClickOpen()}>+ Add User</Button>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {users.map((user) => (
              <Grid item key={user.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={user.name}
                    subheader={user.email}
                  />
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography>
                      Main ek finance expert hoon. Mujhe sab aata hai.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button onClick={() => onDelete(user)} size="small" color="primary">
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Dialog */}
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Copyright FinCloud 2021
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}