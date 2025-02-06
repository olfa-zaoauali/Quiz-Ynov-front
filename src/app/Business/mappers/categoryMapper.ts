import { Injectable } from "@angular/core";

import { Category } from "../models/category";
import { CategoryDto } from "../dtos/categoryDto";

@Injectable({providedIn:'root'})
export class CategoryMapper{
    public fromDto(dto:CategoryDto):Category{
        const { ...rest} = dto; 
        return {
            ...rest,
        
        }; 
    }
}  