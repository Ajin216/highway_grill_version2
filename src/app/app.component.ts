import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { FloatingActionsComponent } from './components/floating-actions/floating-actions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    LoadingScreenComponent,
    BackToTopComponent,
    FloatingActionsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'highway-grill';
}
