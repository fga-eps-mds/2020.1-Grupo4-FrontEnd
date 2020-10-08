import api from './api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  QUESTIONS_ENDPOINT,
  MODULES_ENDPOINT,
  ANSWERS_ENDPOINT
} from './endpoints/tutorials';

const getQuestions = createAsyncThunk('tutorial/getQuestions', async module => {
  try {
    const response = await api.get(`${QUESTIONS_ENDPOINT}?moduleNumber=${module}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
});

const answerQuestion = createAsyncThunk('tutorial/answerQuestion', async data => {
  try {
    const response = await api.post(ANSWERS_ENDPOINT, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
});

const getAnswers = createAsyncThunk('tutorial/getQuestionsResults', async (questions = []) => {
  questions = questions.map(item => `questions=${item}`).join('&');
  try {
    const response = await api.get(`${ANSWERS_ENDPOINT}?${questions}`);
    return response.data;
  } catch (error) {
    return { correctAnswers: 0, queryAnswers: []}
  }
});


const updateMarkdown = createAsyncThunk('tutorial/updateMarkdown', async currentModule => {
  const file = await import(`../assets/tutorial/${currentModule}.md`);
  const response = await fetch(file.default);
  const text = await response.text();
  return text
});

const getModules = createAsyncThunk('tutorial/getModules', async () => {
  try {
    const response = await api.get(MODULES_ENDPOINT);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
});

export {
  getQuestions,
  updateMarkdown,
  getModules,
  answerQuestion,
  getAnswers,
};