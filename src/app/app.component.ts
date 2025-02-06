import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./pages/components/navbar/navbar.component";
import { SidebarComponent } from "./pages/components/sidebar/sidebar.component";
import { FooterComponent } from "./pages/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent, SidebarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'quiz-ynov-front';
}
