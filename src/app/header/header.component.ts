import {Component, OnInit} from '@angular/core';
import {ImageModule} from "primeng/image";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ImageModule,
    BreadcrumbModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  implements OnInit{

  title:string = "Mississippi";
  logoImgPath: string="/assets/image/logo.png";

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  ngOnInit(): void {
    this.items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}
