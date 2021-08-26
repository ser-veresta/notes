import { Container, Grid, Typography } from "@material-ui/core";
import { useContext } from "react";
import noteState from "../../context";
import { NoteCard } from "../utils/NoteCard";
export const Notes = () => {
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(noteState);

  return (
    <Container>
      {state.loading ? (
        <Typography variant="h4" color="textSecondary">
          Loading ...
        </Typography>
      ) : (
        <div>
          {state.err ? (
            <Typography variant="h4" color="textSecondary">
              error
            </Typography>
          ) : (
            state.data && (
              <Grid container spacing={4}>
                {state.data.map((ele) => (
                  <Grid key={ele.id} item xs={12} sm={6} md={4}>
                    <NoteCard note={ele} />
                  </Grid>
                ))}
              </Grid>
            )
          )}
        </div>
      )}
    </Container>
  );
};
