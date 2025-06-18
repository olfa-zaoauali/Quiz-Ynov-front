import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../../Business/models/category';
import { Quiz } from '../../../Business/models/quiz';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../Business/services/categoryService';
import { QuizService } from '../../../Business/services/quizService';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  protected categorys: Category[] = [];
  protected quizes: Quiz[] = [];
  private subscription?: Subscription;
  selectedCategoryId: string | null = null; 


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

  assignQuizzesToCategories(): void {
    this.categorys.forEach(category => {
      this.quizes.forEach(quiz => {
        if (quiz.categoryId === category.id) {
          console.log(`Le quiz '${quiz.name}' appartient à la catégorie '${category.name}'`);
        }
      });
    });
  }
  getQuizzesByCategory(categoryId: string): any[] {
    return this.quizes.filter(quiz => quiz.categoryId === categoryId);
  }

  toggleQuizDropdown(categoryId: string): void {
    this.selectedCategoryId = this.selectedCategoryId === categoryId ? null : categoryId;
  }

  trackCategoryId(index: number, category: any): string {
    return category.id;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // Se désabonner si nécessaire
  }
}

