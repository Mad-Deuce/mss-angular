import { Component } from '@angular/core';
import {ContentComponent} from "./content/content.component";
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ContentComponent,
    HeaderComponent,
    SidebarComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
