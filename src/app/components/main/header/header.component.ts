import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ImageModule} from "primeng/image";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem} from "primeng/api";
import {LogoComponent} from "./logo/logo.component";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";

declare function particles(): void;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ImageModule,
    BreadcrumbModule,
    LogoComponent,
    MenuModule,
    ButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit {

  breadcrumbsItems: MenuItem[] | undefined;
  breadcrumbsHome: MenuItem | undefined;

  menuItems: MenuItem[] | undefined;
  menuLabel: string = "user_name";

  ngOnInit(): void {
    this.breadcrumbsItems = [{label: 'Computer'}, {label: 'Notebook'}, {label: 'Accessories'}, {label: 'Backpacks'}, {label: 'Item'}];
    this.breadcrumbsHome = {icon: 'pi pi-home', routerLink: ''};

    this.menuItems = [
      {
        label: 'Options',
        items: [
          {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
            }
          },
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
            }
          }
        ]
      },
      {
        label: 'Navigate',
        items: [
          {
            label: 'Angular',
            icon: 'pi pi-external-link',
            url: 'http://angular.io'
          },
          {
            label: 'Router',
            icon: 'pi pi-upload',
            routerLink: '/fileupload'
          }
        ]
      }
    ];
  }

  ngAfterViewInit(): void {
    particles();
  }

}
