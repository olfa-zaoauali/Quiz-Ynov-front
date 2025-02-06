import { Injectable } from "@angular/core";
import { QuizDto } from "../dtos/quizDto";
import { Quiz } from "../models/quiz";

@Injectable({providedIn:'root'})
export class QuizMapper {
    public fromDto(dto: QuizDto): Quiz {
        const { dateCreation, categoryById, ...rest } = dto; 
        return {
            ...rest,
            categoryId: categoryById,
            dateCreation: new Date(dateCreation) // Convertir dateCreation en un objet Date
        }; 
    }
}
