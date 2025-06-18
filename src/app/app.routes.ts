import { Routes } from '@angular/router';
import { QuizDetailsPage } from './pages/quiz-details/quiz-details.page';
import { CategoryComponent } from './pages/category/category.component';
import { ListQuizesComponent } from './pages/list-quizes/list-quizes.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { AppHomePageimplements } from './pages/app-home/app-home.page';

export const routes: Routes = [
    { path: '', component: AppHomePageimplements }, 
    { path: 'quizes/:id', component: QuizDetailsPage },
    { path: 'quizes', component: ListQuizesComponent }, 
    { path: 'categorys', component: CategoryComponent }, 
    { path: 'questions/:id', component: QuizComponent }, 
    { path: 'categorys/:id', component: QuizDetailsPage },




];
