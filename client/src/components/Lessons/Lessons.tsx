import React, { useEffect, useState } from 'react';
import * as userService from '../../services/user.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Lesson } from '../../types/types';
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
  CircularProgress,
} from '@mui/material';
import { MenuBook, Description } from '@mui/icons-material';
import BasicModal from '../BasicModal';
import Notes from '../../features/Notes';
import CreateLesson from '../../features/CreateLesson';
import './Lessons.css';
import { useDispatch } from 'react-redux';
import { closeLibrary } from '../../redux/user';
import { useLocation } from 'react-router-dom';
import routes from '../../utils/routes';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [allLessons, setAllLessons] = useState([]);
  const [lessonId, setLessonId] = useState<string>('');
  const [openNotesModal, setOpenNotesModal] = useState(false);
  const [openCreateLessonModal, setOpenCreateLessonModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.users);

  //TODO: Teacher should assign each lesson to the students
  const getLessons = async () => {
    const response = await userService.getLessonsbyUserId(user.id);
    setLoading(false);
    setLessons(response);
  };

  const getAllLessons = async () => {
    // TODO: Demo to get allLessons always just for demo
    const response = await userService.getAllLessons(user.schoolId);
    setLoading(false);
    setAllLessons(response.subjects[0].lessons);
  };

  const handleModal = (event, lessonId: string) => {
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
      getAllLessons();
      getLessons();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="lessons">
      {location.pathname !== routes.lessons.url ? (
        <AppBar
          className="nav"
          position="static"
        >
          <Toolbar>
            <MenuBook />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, marginLeft: 2 }}
            >
              Lessons
            </Typography>
            {!user.student && (
              <Button
                color="success"
                variant="contained"
                data-button-clicked="new-lesson"
                onClick={(event) => handleModal(event, '')}
              >
                Create New Lesson
              </Button>
            )}
          </Toolbar>
        </AppBar>
      ) : (
        <div className="lessons__content">
          <Typography
            variant="h4"
            gutterBottom
          >
            My Lessons
          </Typography>
        </div>
      )}
      <Container maxWidth="sm">
        <Stack
          spacing={2}
          mt={5}
          mb={5}
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {allLessons ? (
                allLessons.map((lesson: Lesson) => (
                  <Paper
                    key={lesson.id}
                    className="lesson"
                  >
                    <Typography>{lesson.name}</Typography>
                    <Tooltip title="Open Notes">
                      <>
                        {lessons.some((e: Lesson) => e.id === lesson.id) && (
                          <IconButton
                            onClick={(event) => handleModal(event, lesson.id)}
                            data-button-clicked="note"
                          >
                            <Description />
                          </IconButton>
                        )}
                      </>
                    </Tooltip>
                  </Paper>
                ))
              ) : (
                <p>Sorry, you dont have any lesson</p>
              )}
            </>
          )}
          <div>
            <Button
              variant="contained"
              color="error"
              sx={{ width: 100 }}
              onClick={() => dispatch(closeLibrary())}
            >
              Close
            </Button>
          </div>
        </Stack>
        <BasicModal
          open={openNotesModal}
          handleModal={handleModal}
        >
          <Notes
            userId={user.id}
            lessonId={lessonId}
            setOpenNotesModal={setOpenNotesModal}
          />
        </BasicModal>
        <BasicModal
          open={openCreateLessonModal}
          handleModal={handleModal}
          padding={0}
        >
          <CreateLesson setOpenCreateLessonModal={setOpenCreateLessonModal} />
        </BasicModal>
      </Container>
    </div>
  );
};

export default Lessons;
