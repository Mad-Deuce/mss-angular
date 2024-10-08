import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TabViewService {

  tabs: TabNode[] = [];
  tabsSubject = new BehaviorSubject<TabNode[]>(this.tabs);
  activeTabIndexSubject = new BehaviorSubject<number>(0);

  constructor() {
  }

  addTab(tabNode: TabNode) {
    const duplicateIndex = this.tabs.findIndex((item) => item.id == tabNode.id);
    if (duplicateIndex < 0) {
      this.tabs.push(tabNode);
      this.tabsSubject.next(this.tabs);
      let activeIndex = this.tabs.findIndex((item) => item.id == tabNode.id);
      this.activeTabIndexSubject.next(activeIndex);
    } else {
      this.activeTabIndexSubject.next(duplicateIndex);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.tabsSubject.next(this.tabs);
  }

  activeIndexChange(index: number) {
    this.activeTabIndexSubject.next(index);
  }
}

export class TabNode {

  public id: string = "";
  public template: string = "";
  public label: string = "";         // displaying in the tab label
  public tabHeader: string = "";        // displaying in the tab header

  constructor(id: string, template: string, header: string, label: string) {
    this.id = id;
    this.template = template;
    this.label = label;
    this.tabHeader = header;
  }
}
