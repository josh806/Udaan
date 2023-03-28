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
import CreateLesson from '../features/CreateLesson';
import './Lessons.css';
import AuthRequired from './AuthRequired';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [lessonId, setLessonId] = useState<string>('');
  const [openNotesModal, setOpenNotesModal] = useState(false);
  const [openCreateLessonModal, setOpenCreateLessonModal] = useState(false);

  const user = useSelector((state: RootState) => state.users);

  const getLessons = async () => {
    const response = await userService.getLessonsbyUserId(user.id);
    setLessons(response);
  };

  const handleModal = (event, lessonId: string) => {
    console.log(event, lessonId);
    const clicked = event.currentTarget.dataset;
    if (clicked.buttonClicked === 'note') {
      setLessonId(lessonId);
      setOpenNotesModal(!openNotesModal);
    } else if (clicked.buttonClicked === 'new-lesson') {
      setOpenCreateLessonModal(!openCreateLessonModal);
    } else {
      setOpenNotesModal(false);
      setOpenCreateLessonModal(false);
    }
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
            <Button
              color='success'
              variant='contained'
              data-button-clicked='new-lesson'
              onClick={(event) => handleModal(event, '')}
            >
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
                    <IconButton
                      onClick={(event) => handleModal(event, lesson.id)}
                      data-button-clicked='note'
                    >
                      <Description />
                    </IconButton>
                  </Tooltip>
                </Paper>
              ))}
          </Stack>
          <BasicModal open={openNotesModal} handleModal={handleModal}>
            <Notes userId={user.id} lessonId={lessonId} />
          </BasicModal>
          <BasicModal
            open={openCreateLessonModal}
            handleModal={handleModal}
            padding={0}
          >
            <CreateLesson setOpenCreateLessonModal={setOpenCreateLessonModal} />
          </BasicModal>
        </Container>
      </>
    </AuthRequired>
  );
};

export default Lessons;
