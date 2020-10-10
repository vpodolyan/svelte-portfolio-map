import { writable } from 'svelte/store';
import { data } from '../data';

export const stocksData = writable(data);