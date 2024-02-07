import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ImageModule} from "primeng/image";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem} from "primeng/api";
import {LogoComponent} from "./logo/logo.component";

declare function particles(): void;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ImageModule,
    BreadcrumbModule,
    LogoComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit {

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  ngOnInit(): void {
    this.items = [{label: 'Computer'}, {label: 'Notebook'}, {label: 'Accessories'}, {label: 'Backpacks'}, {label: 'Item'}];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
    particles();
  }

  ngAfterViewInit(): void {

  }

}
