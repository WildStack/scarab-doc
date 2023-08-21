import axios from 'axios';
import { consts } from './config/constants';

export const http = axios.create({
  baseURL: `${consts.backendApiUrl}/api`,
  timeout: 10000,
});
