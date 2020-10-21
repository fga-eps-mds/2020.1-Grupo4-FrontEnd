import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit'
import api from './api';
import { MENTOR_REQUEST_ENDPOINT, LEARNER_ENDPOINT } from './endpoints/learner';

const assignMentor = createAsyncThunk('learner/mentorRequest', async (values, { rejectWithValue }) => {
  try {
    const response = await api.patch(MENTOR_REQUEST_ENDPOINT);
    /* eslint-disable no-unused-expressions */
    toast.success(`${response.data.name} é seu novo mentor`)

    return response.data;
  } catch (error) {
    if(error.response.data.error === 'There are no available mentors'){
      toast.error('Infelizmente, não há mentores disponíveis no momento')
    } else if(error.response.data.error === 'Learner already has a mentor') {
      toast.error('Você já possui um mentor')
    } else {
      toast.error('Ocorreu um problema no servidor')
    }
    return rejectWithValue(error.response.data.mentor_request)
  }
});

const unassignMentor = createAsyncThunk('learner/unassignMentor', async (values, { rejectWithValue }) => {
  try {
    const response = await api.delete(LEARNER_ENDPOINT);
    toast.success('Mentor desvinculado com sucesso');
    return response.data
  } catch (error) {
    toast.console.error('Ocorreu um erro ao desvincular seu mentor, tente novamente mais tarde');
    return rejectWithValue(error.response.data.mentor)
  }
})

const getMentor = createAsyncThunk('learner/getMentor', async (values, { rejectWithValue }) => {
  try {
    const response = await api.get(LEARNER_ENDPOINT)
    return response.data
  } catch(error) {
    return rejectWithValue(error.response.data.mentor)
  }
});

const cancelMentorRequest = createAsyncThunk('learner/cancelMentorRequest', async (values, { rejectWithValue }) => {
  try {
    const response = await api.patch(`${LEARNER_ENDPOINT}/request`)
    toast.success('Solicitação cancelada com sucesso')
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data.mentor_request)
  }
})

export {
  assignMentor,
  getMentor,
  cancelMentorRequest,
  unassignMentor
}