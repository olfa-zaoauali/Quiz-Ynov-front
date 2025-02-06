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
    this.getAllCategories();  // Récupérer les catégories
    this.getAllQuizes();      // Récupérer les quiz
  }

  // Fonction pour récupérer toutes les catégories
  getAllCategories(): void {
    this.categoryService.listCategory().subscribe(categories => {
      this.categorys = categories;
      this.assignQuizzesToCategories(); // Associer les quiz aux catégories
    });
  }

  // Fonction pour récupérer tous les quiz
  getAllQuizes(): void {
    this.quizService.list().subscribe(quizes => {
      this.quizes = quizes;
      this.assignQuizzesToCategories(); // Associer les quiz aux catégories après avoir récupéré les quiz
    });
  }

  // Fonction pour associer les quiz à chaque catégorie
  assignQuizzesToCategories(): void {
    // Parcourir toutes les catégories
    this.categorys.forEach(category => {
      // Pour chaque catégorie, parcourir les quiz pour trouver ceux associés à cette catégorie
      this.quizes.forEach(quiz => {
        if (quiz.categoryId === category.id) {
          // Ici, vous pouvez maintenant utiliser ces quiz pour les afficher ou faire quelque chose
          console.log(`Le quiz '${quiz.name}' appartient à la catégorie '${category.name}'`);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // Se désabonner si nécessaire
  }
}
