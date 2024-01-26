import {Component, OnInit} from '@angular/core';
import {ImageModule} from "primeng/image";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem} from "primeng/api";
import {LogoComponent} from "./logo/logo.component";

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
export class HeaderComponent  implements OnInit{

  title:string = "Metro.iD";
  // logoImgPath: string="/assets/image/mid_logo.png";
  logoImgPath: string="/assets/svg/mid_logo_2.svg";
  // logoImgPath: string="/assets/svg/logo.svg";

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  ngOnInit(): void {
    this.items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}
