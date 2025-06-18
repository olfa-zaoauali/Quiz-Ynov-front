import { Component, input } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizService } from '../../Business/services/quizService';
import { Quiz } from '../../Business/models/quiz';
import { CategoryService } from '../../Business/services/categoryService';
import { Category } from '../../Business/models/category';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
  protected category: Category| undefined;
  private subscription ?: Subscription; 
  constructor(private readonly quizService: QuizService, private readonly categoryService : CategoryService,private route: ActivatedRoute,private router: Router ) { }

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('id');  
    if (quizId) {
      this.quizService.getQuizById(quizId).subscribe((quiz) => {
        this.quize = quiz;
        console.log('Données du quiz chargées :', this.quize);

        
        if (quiz.categoryId) {
          this.categoryService.getCategoryById(quiz.categoryId).subscribe((category) => {
            this.category = category;  
          });
        }
      });
    }
  }
 
  
  startQuiz(quizId: string): void {
    if (!quizId) {
      console.error('Erreur : quizId est vide ou non défini.');
      return;
    }
  
    console.log('Navigation vers le quiz avec ID:', quizId);
    this.router.navigate(['/questions', quizId]);
  }
  
  ngOnDestroy(): void {
         this.subscription?.unsubscribe
  }
}
