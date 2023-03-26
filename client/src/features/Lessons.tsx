import React, { useEffect, useState } from 'react';
import * as userService from '../services/user.service';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Lesson } from '../types/types';
import {
  AppBar,
  Toolbar,
  Tooltip,
  Container,
  Stack,
  Paper,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { MenuBook, Description } from '@mui/icons-material';
import './Lessons.css';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const user = useSelector((state: RootState) => state.users);

  const getLessons = async () => {
    // TODO: add current userId
    const response = await userService.getLessonsbyUserId('abcd1');
    setLessons(response);
  };

  useEffect(() => {
    try {
      getLessons();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <MenuBook />
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, marginLeft: 2 }}
          >
            Lessons
          </Typography>
          <Button color='success' variant='contained'>
            Create New Lesson
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth='sm'>
        <Stack spacing={2} mt={5}>
          {lessons &&
            lessons.map((lesson: Lesson) => (
              <Paper key={lesson.id} className='lesson'>
                {lesson.name}{' '}
                <Tooltip title='Open Notes'>
                  <IconButton>
                    <Description />
                  </IconButton>
                </Tooltip>
              </Paper>
            ))}
        </Stack>
      </Container>
    </>
  );
};

export default Lessons;
