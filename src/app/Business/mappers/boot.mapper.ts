import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class SingletonService{}
@Injectable()
export class ScopedService{}