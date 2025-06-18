import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './app-home.page.html',
  styleUrl: './app-home.page.scss'
})
export class AppHomePageimplements implements OnInit {


  constructor() { }

  ngOnInit(): void {
    
  }

}
