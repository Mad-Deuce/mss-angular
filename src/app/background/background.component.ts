import {
  AfterViewInit,
  Component,
} from '@angular/core';

declare function demo(): void;

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    demo();
  }
}
