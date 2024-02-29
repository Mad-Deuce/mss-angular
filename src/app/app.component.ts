import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {ContentComponent} from "./components/content/content.component";
import {FooterComponent} from "./components/footer/footer.component";
import {OrganizationFilterComponent} from "./components/temp/organization-filter/organization-filter.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,
    HeaderComponent, SidebarComponent, ContentComponent, FooterComponent, OrganizationFilterComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mss-angular';

}
