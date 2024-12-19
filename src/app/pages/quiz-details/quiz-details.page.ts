import { Component, input } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizService } from '../../Business/services/quizService';
import { Quiz } from '../../Business/models/quiz';

@Component({
  selector: 'app-quiz-details',
  standalone: true,
  imports: [],
  templateUrl: './quiz-details.page.html',
  styleUrl: './quiz-details.page.scss'
})
export class QuizDetailsPage {

  public readonly id= input.required<string>(); 
  protected quize:Quiz | undefined;
  private subscription ?: Subscription; 
  constructor(private readonly quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizById(this.id()).subscribe(quize => {
      this.quize = quize;
    });
  }
  ngOnDestroy(): void {
         this.subscription?.unsubscribe
  }
}
