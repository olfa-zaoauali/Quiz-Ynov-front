export interface Question{
    readonly id: string;
    readonly content: string;
    readonly quizId: string;
    readonly choices: string[];
    readonly correctAnswer: string; 
}