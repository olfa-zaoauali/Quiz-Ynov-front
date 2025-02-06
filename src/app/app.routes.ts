import { Routes } from '@angular/router';
import { AppHomePageimplements } from './pages/home/app-home/app-home.page';
import { QuizDetailsPage } from './pages/quiz-details/quiz-details.page';
import { CategoryComponent } from './pages/category/category.component';
import { ListQuizesComponent } from './pages/list-quizes/list-quizes.component';
import { QuizComponent } from './pages/quiz/quiz.component';

export const routes: Routes = [
    { path: '', component: AppHomePageimplements }, 
    { path: 'quizes/:id', component: QuizDetailsPage },
    { path: 'quizes', component: ListQuizesComponent }, 
    { path: 'categorys', component: CategoryComponent }, 
    { path: 'questions/:id', component: QuizComponent }, 
    { path: 'categorys/:id', component: QuizDetailsPage },




];
