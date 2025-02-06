import { Injectable } from "@angular/core";
import { QuestionDto } from "../dtos/questionDto";
import { Question } from "../models/question";

@Injectable({providedIn:'root'})
export class QuestionMapper{
    public fromDto(dto:QuestionDto):Question{
        const {quizId, ...rest} = dto; 
        return {
            ...rest,
            quizId: quizId,
        }; 
    }


 

}  