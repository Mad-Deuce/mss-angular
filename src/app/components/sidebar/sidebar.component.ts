import {Component, OnInit} from '@angular/core';
import {PanelMenuModule} from "primeng/panelmenu";
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {MenuModule} from "primeng/menu";
import {TabNode, TabViewService} from "../../services/tab-view.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    PanelMenuModule,
    MenuModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  constructor(private tabViewService: TabViewService) {
  }

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Measuring Instruments',
        icon: 'pi pi-fw pi-clock',
        items: [
          {
            label: 'Lists',
            icon: 'pi pi-fw pi-list',
            items: [
              {
                label: 'Main List',
                icon: '',
                command: () => {
                  this.onClick(new TabNode("0101", "mi-main", "Main List",
                    "Main List of Measuring Instruments"));
                },
              },
              {
                label: 'Indicators List',
                icon: '',
                command: () => {
                  this.onClick(new TabNode("0102", "mi-indicators", "Indicators",
                    "Indicators List"));
                },
              },
              {
                label: 'Long-term storage List',
                icon: '',
                command: () => {
                  this.onClick(new TabNode("0103", "mi-long-term-storage", "Long-term storage List",
                    "Long-term storage List of Measuring Instruments"));
                },
              },
              {
                label: 'List of instruments for metrology maintenance',
                icon: '',
                command: () => {
                  this.onClick(new TabNode("0104", "mi-metrology-maintenance", "Maintenance List",
                    "List of instruments for metrology maintenance"));
                },
              },
            ],

          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash'
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left'
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify'
          }
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          }
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      }
    ];
  }

  onClick(tabNode: TabNode) {
    this.tabViewService.addTab(tabNode)
  }
}
