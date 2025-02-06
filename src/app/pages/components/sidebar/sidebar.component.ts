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
  selectedCategoryId: string | null = null;  // Variable pour gérer la catégorie sélectionnée


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
  // Récupérer les quiz associés à une catégorie
  getQuizzesByCategory(categoryId: string): any[] {
    return this.quizes.filter(quiz => quiz.categoryId === categoryId);
  }

  // Fonction pour gérer l'affichage/masquage du sous-menu des quiz
  toggleQuizDropdown(categoryId: string): void {
    this.selectedCategoryId = this.selectedCategoryId === categoryId ? null : categoryId;
  }

  // Fonction pour le suivi de l'identifiant des catégories (optimisation de la boucle *ngFor)
  trackCategoryId(index: number, category: any): string {
    return category.id;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // Se désabonner si nécessaire
  }
}

