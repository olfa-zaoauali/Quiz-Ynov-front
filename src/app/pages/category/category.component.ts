import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../Business/services/categoryService';
import { Subscription } from 'rxjs';
import { Category } from '../../Business/models/category';
import { QuizService } from '../../Business/services/quizService';
import { Quiz } from '../../Business/models/quiz';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit, OnDestroy {
  protected categorys: Category[] = [];
  protected quizes: Quiz[] = [];
  private subscription?: Subscription;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();  
    this.getAllQuizes();      
  }

  getAllCategories(): void {
    this.categoryService.listCategory().subscribe(categories => {
      this.categorys = categories;
      this.assignQuizzesToCategories(); 
    });
  }

  
  getAllQuizes(): void {
    this.quizService.list().subscribe(quizes => {
      this.quizes = quizes;
      this.assignQuizzesToCategories(); 
    });
  }

  // Fonction pour associer les quiz à chaque catégorie
  assignQuizzesToCategories(): void {
    this.categorys.forEach(category => {
      this.quizes.forEach(quiz => {
        if (quiz.categoryId === category.id) {
          console.log(`Le quiz '${quiz.name}' appartient à la catégorie '${category.name}'`);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // Se désabonner si nécessaire
  }
}
