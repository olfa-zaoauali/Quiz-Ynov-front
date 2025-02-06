import { Question } from "./question";

export interface Quiz{

    readonly id: string; 
    readonly name:string;
    readonly description: string; 
    readonly categoryId: string; 
    readonly difficulty: number; 
    readonly dateCreation: Date; 


}