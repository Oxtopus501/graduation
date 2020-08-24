import "./pages/analytics.css";
import {DAYS_BEFORE_REQUEST} from './js/constants/constants.js';

import {Statistics} from './js/components/Statistics.js';
const statistics = new Statistics(localStorage.getItem('request'), JSON.parse(localStorage.getItem('cards')), localStorage.getItem('totalResults'));

const requestTextEl = document.querySelector('.digits__title-value');
const totalResultsEl = document.getElementById('week-news');
const mentionsInHeadlines = document.getElementById('in-headlines');
const diagRows = document.querySelectorAll('.week-analytics__diag-row');
const diagLinesNames = document.querySelectorAll('.week-analytics__day');

requestTextEl.textContent = statistics.requets;
totalResultsEl.textContent = statistics.totalResults;
mentionsInHeadlines.textContent = statistics.countMatchesInTitles();

const today = new Date();
const firstDay = new Date();
//console.log(today);
firstDay.setDate(today.getDate() - DAYS_BEFORE_REQUEST);
//console.log(firstDay);

const weekStats = statistics.calculateDailyAmount(today, DAYS_BEFORE_REQUEST);
//console.log(weekStats);
//console.log(diagLinesNames);

statistics.signDiagLines(diagLinesNames, firstDay);
statistics.renderDiagRows(diagRows, weekStats);
