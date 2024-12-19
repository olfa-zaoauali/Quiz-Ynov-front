import { Routes } from '@angular/router';
import { AppHomePageimplements } from './pages/home/app-home/app-home.page';
import { QuizDetailsPage } from './pages/quiz-details/quiz-details.page';

export const routes: Routes = [
    { path: 'quizes', component: AppHomePageimplements }, 
    { path: 'quizes/:id', component: QuizDetailsPage },

];
