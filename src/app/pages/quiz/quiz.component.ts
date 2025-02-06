import { Component, OnDestroy, OnInit } from '@angular/core';
import { Question } from '../../Business/models/question';
import { QuestionService } from '../../Business/services/questionService';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../Business/services/quizService';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit, OnDestroy {

  currentQuestionIndex = 0;
  protected questions: Question[] = [];
  subscription: any;
  quizId: string | null = null;
  score: number = 0;  // Initialiser le score à 0
  finalscore: number = 0;  // Score final à la fin du quiz
  timer = 600; // Timer de 10 minutes (600 secondes)
  timerInterval: any;
  quizFinished = false;
  formattedTime: string = '';
  selectedAnswer: string = '';

  userResponses: { [key: string]: string } = {};  // Dictionnaire pour stocker les réponses (clé: id de question, valeur: réponse)

  constructor(
    private readonly questionService: QuestionService, 
    private readonly route: ActivatedRoute, 
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID du quiz depuis l'URL
    this.quizId = this.route.snapshot.paramMap.get('id');
    console.log('Quiz ID:', this.quizId);

    if (this.quizId) {
      this.questionService.list().subscribe(questions => {
        this.questions = questions.filter(question => question.quizId === this.quizId);
        if (this.questions.length === 0) {
          console.warn('Aucune question trouvée pour ce quiz.');
        } else {
          console.log('Questions pour ce quiz:', this.questions);
        }
      });
    } else {
      console.error('Quiz ID est introuvable dans l\'URL.');
    }

    this.startTimer();
  }

  // Fonction pour démarrer le timer
  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.updateFormattedTime();
      } else {
        clearInterval(this.timerInterval);
        this.quizFinished = true;
        alert('Le temps est écoulé !');
      }
    }, 1000); // Décrémenter chaque seconde
  }

  updateFormattedTime(): void {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    this.formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }


nextQuestion(): void {
  if (this.selectedAnswer) {
    // Ajouter la réponse au dictionnaire avec l'ID de la question comme clé
    this.userResponses[this.questions[this.currentQuestionIndex].id] = this.selectedAnswer;

    // Passer à la question suivante ou envoyer les réponses au backend
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = ''; // Réinitialiser la sélection
    } else {
      // Une fois que toutes les questions ont été répondues, envoyer le dictionnaire au backend
      this.questionService.verifyAnswers(this.userResponses).subscribe({
        next: (score) => {
          this.quizFinished = true;
          this.finalscore = score;
          clearInterval(this.timerInterval); // Arrêter le timer
        },
        error: (err) => {
          console.error('Erreur lors de la vérification des réponses :', err);
        }
      });
    }
  } else {
    console.warn('Veuillez choisir une réponse avant de continuer.');
  }
}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
