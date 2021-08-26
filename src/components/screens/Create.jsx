import { Button, Container, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { ReactComponent as CreateSVG } from "../../svg/undraw_publish_post_vowb.svg";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import noteState from "../../context";
import { Controller, useForm } from "react-hook-form";

const useStyles = makeStyles({
  form: {
    marginTop: 60,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  svg: {
    marginTop: 20,
    width: "100%",
  },
});

export const Create = () => {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(noteState);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const url = "https://609e2b4933eed80017957ebb.mockapi.io/note";

  useEffect(() => {
    if (id) {
      const singleData = !state.loading && state.data.filter((ele) => ele.id === id)[0];
      setValue("title", singleData.title);
      setValue("details", singleData.details);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading]);

  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post(url, formData);

      state.fetchData();

      data && history.push("/notes");
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async (formData) => {
    try {
      const { data } = await axios.put(`${url}/${id}`, formData);

      state.fetchData();

      data && history.push("/notes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Grid direction="row-reverse" justifyContent="center" alignItems="center" spacing={3} container>
        <Grid md={6} sm={12} item>
          <CreateSVG className={classes.svg} />
        </Grid>
        <Grid md={6} sm={12} item>
          <Typography variant="h4" color="textSecondary" gutterBottom>
            {id ? "Update" : "Create"} a Notes
          </Typography>
          {/* <form onSubmit={id ? handleUpdate : handleSubmit} noValidate autoComplete="off" className={classes.form}>
            <TextField
              value={formData.title}
              onChange={(e) => setFormData((value) => ({ ...value, title: e.target.value }))}
              label="Title"
              variant="filled"
              fullWidth
              required
              className={classes.field}
              error={errorData.title}
            />
            <TextField
              value={formData.details}
              onChange={(e) => setFormData((value) => ({ ...value, details: e.target.value }))}
              label="Note Details"
              variant="filled"
              fullWidth
              required
              multiline
              minRows={5}
              className={classes.field}
              error={errorData.details}
            />
            <Button type="submit" color="primary" variant="contained" size="large">
              {id ? "Update" : "Create"} Note
            </Button>
          </form> */}
          <form onSubmit={handleSubmit(id ? onUpdate : onSubmit)} autoComplete="off" className={classes.form}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Field should be filled" }}
              render={({ field }) => (
                <TextField
                  label="Title"
                  variant="filled"
                  fullWidth
                  className={classes.field}
                  error={errors.title}
                  helperText={errors.title?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="details"
              control={control}
              rules={{ required: "Field should be filled" }}
              render={({ field }) => (
                <TextField
                  label="Note Details"
                  variant="filled"
                  fullWidth
                  multiline
                  minRows={5}
                  className={classes.field}
                  error={errors.title}
                  helperText={errors.title?.message}
                  {...field}
                />
              )}
            />
            <Button type="submit" color="primary" variant="contained" size="large">
              {id ? "Update" : "Create"} Note
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
