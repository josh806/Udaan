import React, { useEffect, useState } from 'react';
import * as userService from '../services/user.service';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Lesson, NoteBook } from '../types/types';
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
import BasicModal from '../components/BasicModal';
import Notes from '../features/Notes';
import './Lessons.css';
import AuthRequired from './AuthRequired';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [openNotesModal, setOpenNotesModal] = useState(false);
  const [lessonId, setLessonId] = useState<string>('');

  const user = useSelector((state: RootState) => state.users);

  const getLessons = async () => {
    const response = await userService.getLessonsbyUserId(user.id);
    setLessons(response);
  };

  const handleNotesModal = (lessonId: string) => {
    setLessonId(lessonId);
    setOpenNotesModal(!openNotesModal);
  };

  useEffect(() => {
    try {
      getLessons();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <AuthRequired>
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
          <Stack spacing={2} mt={5} mb={5}>
            {lessons &&
              lessons.map((lesson: Lesson) => (
                <Paper key={lesson.id} className='lesson'>
                  <Typography>{lesson.name}</Typography>
                  <Tooltip title='Open Notes'>
                    <IconButton onClick={() => handleNotesModal(lesson.id)}>
                      <Description />
                    </IconButton>
                  </Tooltip>
                </Paper>
              ))}
          </Stack>
          <BasicModal open={openNotesModal} handleModal={handleNotesModal}>
            <Notes userId={user.id} lessonId={lessonId} />
          </BasicModal>
        </Container>
      </>
    </AuthRequired>
  );
};

export default Lessons;
