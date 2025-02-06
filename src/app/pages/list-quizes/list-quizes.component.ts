import { Component, OnDestroy, OnInit } from '@angular/core';
import { Quiz } from '../../Business/models/quiz';
import { Category } from '../../Business/models/category';
import { Question } from '../../Business/models/question';
import { Subscription } from 'rxjs';
import { QuizService } from '../../Business/services/quizService';
import { QuestionService } from '../../Business/services/questionService';
import { CategoryService } from '../../Business/services/categoryService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-quizes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-quizes.component.html',
  styleUrl: './list-quizes.component.scss'
})
export class ListQuizesComponent implements OnInit, OnDestroy{

  protected quizes: Quiz[]=[];
  protected questions: Question[]=[]; 
  protected categorys: Category[]=[];
  private subscription ?: Subscription; 
  constructor(private readonly quizService: QuizService, private readonly questionService : QuestionService, private readonly categoryService: CategoryService) { }
  ngOnInit(): void {
    this.getListCategory();
    this.getListQuestion();
    this.getListQuiez();
    
    
  }
  getListQuiez(){
    this.quizService.list().subscribe(quizes => {
      this.quizes = quizes;
    });
  }
  getListQuestion(){
    this.questionService.list().subscribe(questions => {
      this.questions = questions; 
    }); 
  }
  getListCategory(){
    this.categoryService.listCategory().subscribe(categorys=> {
      this.categorys= categorys; 
    }
    )
  }
  
  ngOnDestroy(): void {
         this.subscription?.unsubscribe
  }
  

}
