import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: "100%",
      height: "100%",
      paddingTop: theme.spacing(5),
    },
    toolbar: theme.mixins.toolbar,
    link: {
      marginLeft: theme.spacing(10),
    },
    links: {
      textDecoration: "none",
      marginLeft: theme.spacing(5),
      fontSize: "20",
    },
  };
});

export const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h3" gutterBottom>
            Notes
          </Typography>
          <div className={classes.link}>
            <Link className={classes.links} to="/">
              <Button>Home</Button>
            </Link>
            <Link className={classes.links} to="/notes">
              <Button>Notes</Button>
            </Link>
            <Link className={classes.links} to="/create">
              <Button>Create</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar}></div>
      <div className={classes.page}>{children}</div>
    </div>
  );
};
