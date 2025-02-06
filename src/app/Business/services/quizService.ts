import { Injectable } from "@angular/core";
import { QuizMapper } from "../mappers/quizMapper";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Quiz } from "../models/quiz";
import { QuizDto } from "../dtos/quizDto";

@Injectable({providedIn:'root'})
export class QuizService{
    constructor(private readonly mapper: QuizMapper, private readonly client: HttpClient){

    }
    private readonly apiUrl = 'https://localhost:7137/api/Quiz'; // URL de l'API


    public list():Observable<Quiz[]>{
        return this.client.get<QuizDto[]>(`https://localhost:7137/api/Quiz`)
        .pipe(
            map(dtos=> { 
                return dtos.map(d=> this.mapper.fromDto(d))
            })
        );
    }
    public  getQuizById(id: string): Observable<Quiz> {
        return this.client.get<QuizDto>(`https://localhost:7137/api/Quiz/${id}`)
            .pipe(
                map(d => this.mapper.fromDto(d))
            );
    }
    // Méthode pour envoyer un quiz à l'API et obtenir le score
   public calculScore(quiz: Quiz): Observable<number> {
    return this.client.post<number>(this.apiUrl, quiz);
  }
    
    

}