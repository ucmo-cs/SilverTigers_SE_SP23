import react from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Divider,
  ListItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  const navBarTopics = [
    {
      id: 0,
      route: "/",
      label: "Monthly Calendar View",
    },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Commerce Bank Project
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {navBarTopics.map((topic, index) => (
            <ListItem key={topic.id}>
              <Button variant='text' color='inherit' onClick={() => navigate(topic.route)}>{topic.label}</Button>
            </ListItem>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
