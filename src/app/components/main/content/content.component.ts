import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TabViewModule} from "primeng/tabview";
import {NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from "@angular/common";
import {TabNode, TabViewService} from "../../../services/tab-view.service";
import {MiListMainComponent} from "./mi-list-main/mi-list-main.component";
import {MiScheduleComponent} from "./mi-schedule/mi-schedule.component";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    TabViewModule,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgTemplateOutlet,
    NgForOf,
    MiListMainComponent,
    MiScheduleComponent,
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {

  constructor(private tabViewService: TabViewService, private changeDetectionRef: ChangeDetectorRef) {
  }

  activeTabIndex: number = 0;
  tabs?: TabNode[];

  ngOnInit(): void {
    this.tabViewService.tabsSubject.subscribe(value => {
        this.tabs = value;
        this.changeDetectionRef.detectChanges();
      }
    )
    this.tabViewService.activeTabIndexSubject.subscribe(value => {
        this.activeTabIndex = value;
        this.changeDetectionRef.detectChanges();
      }
    )
  }

  removeTab(index: number) {
    this.tabViewService.removeTab(index);
  }

  activeIndexChange(index: number) {
    this.tabViewService.activeIndexChange(index);
  }


}



