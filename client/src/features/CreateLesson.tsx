import React, { useState, useEffect } from 'react';
import {
  Stack,
  Select,
  Button,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Input,
  InputLabel,
  SelectChangeEvent,
  Tooltip,
  IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import moment from 'moment';
import { Lesson, Subject } from '../types/types';
import * as userService from '../services/user.service';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const initialLesson = {
  name: '',
  subjectId: '',
  scheduledDate: '',
};

type CreateLessonProps = {
  setOpenCreateLessonModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateLesson: React.FC<CreateLessonProps> = ({
  setOpenCreateLessonModal,
}) => {
  const [lesson, setLesson] = useState<Lesson>(initialLesson);
  const [subjects, setSubjects] = useState([]);

  const user = useSelector((state: RootState) => state.users);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Create new Lesson
    e.preventDefault();
    await userService.postNewLesson(lesson);
    setOpenCreateLessonModal(false);
  };

  const getSubjects = async () => {
    const subjects = await userService.getAllSubjects(user.schoolId);
    setSubjects(subjects);
  };

  const handleName = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLesson({ ...lesson, name: event.target.value });
  };
  const handleSubject = async (event: SelectChangeEvent) => {
    setLesson({ ...lesson, subjectId: event.target.value });
  };
  const handleDate = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLesson({ ...lesson, scheduledDate: event.target.value });
  };

  useEffect(() => {
    try {
      getSubjects();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className='lesson-form'>
      <AppBar position='static'>
        <Toolbar>
          <Tooltip title='Back'>
            <IconButton
              color='inherit'
              onClick={() => setOpenCreateLessonModal(false)}
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, marginLeft: 2 }}
          >
            Create New Lesson
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth='sm'>
        <Stack
          component='form'
          autoComplete='off'
          onSubmit={handleSubmit}
          spacing={2}
          mt={5}
          mb={5}
        >
          <InputLabel sx={{ textAlign: 'left' }}>Lesson Name</InputLabel>
          <TextField
            name='lessonName'
            variant='outlined'
            value={lesson.name}
            onChange={handleName}
            required
          />
          <InputLabel id='subject-label' sx={{ textAlign: 'left' }}>
            Subject
          </InputLabel>
          <Select
            labelId='subject-label'
            value={lesson.subjectId}
            name='subjectName'
            onChange={handleSubject}
            required
          >
            {subjects &&
              subjects.map((subject: Subject) => (
                <MenuItem value={subject.id} key={subject.id}>
                  {subject.name}
                </MenuItem>
              ))}
          </Select>
          <InputLabel sx={{ textAlign: 'left' }}>Schedule Date:</InputLabel>
          <Input
            type='date'
            value={lesson.scheduledDate}
            onChange={handleDate}
            slotProps={{
              input: {
                min: moment().format('YYYY-MM-DD'),
              },
            }}
            required
          />
          <Button
            className='_form__field _form__field--submit'
            type='submit'
            variant='contained'
          >
            Create Lesson
          </Button>
        </Stack>
      </Container>
    </div>
  );
};

export default CreateLesson;
