import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { QuestionMapper } from "../mappers/questionMapper";
import { Question } from "../models/question";
import { QuestionDto } from "../dtos/questionDto";

@Injectable({providedIn:'root'})
export class QuestionService{
   
    
    constructor(private readonly mapper: QuestionMapper, private readonly client: HttpClient){

    }
    private readonly apiUrl = 'https://localhost:7137/api/Question'; // URL de l'API


    public list():Observable<Question[]>{
        return this.client.get<QuestionDto[]>(`https://localhost:7137/api/Question`)
        .pipe(
            map(dtos=> { 
                return dtos.map(d=> this.mapper.fromDto(d))
            })
        );
    }
   
    verifyAnswers(userResponses: { [key: string]: string }): Observable<number> {
        // Convertir le dictionnaire en un tableau d'objets avec id et réponse
        const responsesArray = Object.keys(userResponses).map((key) => ({
          questionId: key,
          response: userResponses[key]
        }));
      
        // Envoi de la liste au backend
        return this.client.post<number>(`${this.apiUrl}/calculateScore`, responsesArray);
      }
      

}
