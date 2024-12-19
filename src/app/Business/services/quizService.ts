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
    
    

}