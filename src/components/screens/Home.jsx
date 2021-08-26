import { Button, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ReactComponent as HomeSVG } from "../../svg/undraw_Preparation_re_t0ce.svg";

const useStyles = makeStyles({
  svg: {
    marginTop: 20,
    width: "100%",
  },
  btn: {
    marginTop: 100,
    fontSize: 20,
  },
});

export const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container>
      <Grid direction="row-reverse" justifyContent="center" alignItems="center" spacing={3} container>
        <Grid md={6} sm={12} item>
          <HomeSVG className={classes.svg} />
        </Grid>
        <Grid md={6} sm={12} item>
          <Typography variant="h4" color="textSecondary" gutterBottom>
            Create new notes so you keep track of your work, and know what to do next...
          </Typography>

          <Button
            onClick={() => history.push("create")}
            className={classes.btn}
            color="primary"
            variant="contained"
            size="large"
          >
            Get Started
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
