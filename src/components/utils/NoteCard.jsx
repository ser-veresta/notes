import { Card, CardHeader, CardContent, Typography, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router";
import noteState from "../../context";

export const NoteCard = ({ note }) => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(noteState);

  async function handleDelete(e) {
    await axios.delete(`https://609e2b4933eed80017957ebb.mockapi.io/note/${note.id}`);

    state.fetchData();
  }

  function handleEdit(e) {
    history.push(`/update/${note.id}`);
  }

  return (
    <Card elevation={3}>
      <CardHeader
        title={note.title}
        subheader={note.createdAt}
        action={
          <div>
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
            <IconButton onClick={handleEdit}>
              <Edit />
            </IconButton>
          </div>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
};
