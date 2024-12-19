import { Component, OnDestroy, OnInit } from '@angular/core';
import { Quiz } from '../../../../Business/models/quiz';
import { Subscription } from 'rxjs';
import { QuizService } from '../../../../Business/services/quizService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy{

  protected quizes: Quiz[]=[];
  private subscription ?: Subscription; 
  constructor(private readonly quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.list().subscribe(quizes => {
      this.quizes = quizes;
    });
  }
  ngOnDestroy(): void {
         this.subscription?.unsubscribe
  }
  

}
