import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { CategoryMapper } from "../mappers/categoryMapper";
import { Category } from "../models/category";
import { CategoryDto } from "../dtos/categoryDto";

@Injectable({providedIn:'root'})
export class CategoryService{
    constructor(private readonly mapper: CategoryMapper,private readonly client :HttpClient){}

    
    public listCategory(): Observable<Category[]>{
        return this.client.get<CategoryDto[]>(`https://localhost:7137/api/Category`)
        .pipe(
            map(dtos=> { 
                return dtos.map(d=> this.mapper.fromDto(d))
            })
        );
    }
    public  getCategoryById(id: string): Observable<Category> {
            return this.client.get<CategoryDto>(`https://localhost:7137/api/Category/${id}`)
                .pipe(
                    map(d => this.mapper.fromDto(d))
                );
        }

    
    
    

}