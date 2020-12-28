import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import * as FiIcons from 'react-icons/fi'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#523BE4',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const VerticalDrawer = (props) => {

    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div style={{ marginTop: 65, height: '100%' }}>
            <List component="nav" aria-label="main mailbox folders" style={{ height: '100%' }}>
                <div style={{ display: 'block' }}>
                    <ListItem button component={Link} to="/home">
                        <ListItemIcon>
                            <FiIcons.FiHome size={24} color="#523BE4" />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={Link} to="/business">
                        <ListItemIcon>
                            <FiIcons.FiGrid size={24} color="#523BE4" />
                        </ListItemIcon>
                        <ListItemText primary="Estabelecimento" />
                    </ListItem>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <FiIcons.FiUsers size={24} color="#523BE4" />
                        </ListItemIcon>
                        <ListItemText primary="Vagas" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} component={Link} to="/create-job">
                                <ListItemIcon>
                                    <FiIcons.FiChevronRight size={24} color="grey" />
                                </ListItemIcon>
                                <ListItemText primary="Anunciar" />
                            </ListItem>
                            <ListItem button className={classes.nested} component={Link} to="/list-jobs">
                                <ListItemIcon>
                                    <FiIcons.FiChevronRight size={24} color="grey" />
                                </ListItemIcon>
                                <ListItemText primary="Listar" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button component={Link} to="/search-staff">
                        <ListItemIcon>
                            <FiIcons.FiSearch size={24} color="#523BE4" />
                        </ListItemIcon>
                        <ListItemText primary="Profissionais" />
                    </ListItem>
                    <ListItem button component={Link} to="/finance">
                        <ListItemIcon>
                            <FiIcons.FiRepeat size={24} color="#523BE4" />
                        </ListItemIcon>
                        <ListItemText primary="Financeiro" />
                    </ListItem>
                </div>
                <div style={{ position: 'absolute', bottom: 15, width: '100%' }}>
                    <ListItem button component={Link} to="/settings">
                        <ListItemIcon>
                            <FiIcons.FiSettings size={24} color="#523BE4" />
                        </ListItemIcon>
                        <ListItemText primary="Configurações" />
                    </ListItem>
                </div>
            </List>
        </div>
    )


    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap style={{ fontWeight: 700, fontSize: 22 }}>
                        staffnation
          </Typography>
                </Toolbar>
                <div style={{ justifyContent: 'flex-end', marginRight: 30 }}>
                    <Link to="#">
                        <NotificationsIcon style={{ width: 26, height: 26, marginRight: 10, color: '#fff' }} />
                    </Link>
                    <Link to="/settings">
                        <AccountCircle style={{ width: 26, height: 26, color: '#fff' }} />
                    </Link>
                </div>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
            </main>
        </div>
    );
}
const mapStateToProps = (state) => ({ user: state.user });


export default connect(mapStateToProps)(VerticalDrawer);