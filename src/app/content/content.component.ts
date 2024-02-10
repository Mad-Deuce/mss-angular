import {Component} from '@angular/core';
import {TabViewModule} from "primeng/tabview";
import {NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from "@angular/common";

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
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

  activeTabIndex: number = 0;
  tabs: TabNode[] = [new TabNode(),new TabNode(),new TabNode(), new TabNode(), new TabNode(),   new TabNode(), new TabNode(), new TabNode(), new TabNode(), new TabNode()];
  context = {tabNode: new TabNode()};

  removeTab(index: number) {
    console.log(index);
  }

  activeIndexChange(index: number) {
    console.log(index);
  }
}


export class TabNode {

  public id: string = "";
  public label: string = "";         // displaying in the tab label
  public tabHeader: string = "";        // displaying in the tab header

  constructor() {
    this.id = "11";
    this.label = "defaultTabLabel";
    this.tabHeader = "defaultTabHeader";
  }
}
