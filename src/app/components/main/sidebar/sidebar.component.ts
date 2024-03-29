import {Component, OnInit} from '@angular/core';
import {PanelMenuModule} from "primeng/panelmenu";
import {MenuItem,} from "primeng/api";
import {MenuModule} from "primeng/menu";
import {TabNode, TabViewService} from "../../../services/tab-view.service";

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
        label: 'Засоби вимірювальної техніки',
        icon: 'pi pi-fw pi-clock',
        items: [
          {
            label: 'Переліки',
            icon: 'pi pi-fw pi-list',
            items: [
              {
                label: 'Загальний перелік (ф.2050)',
                icon: '',
                command: () => {
                  this.onClick(new TabNode("0101", "mi_list_main", "ф.2050",
                    "ПЕРЕЛІК ЗАСОБІВ ВИМІРЮВАЛЬНОЇ ТЕХНІКИ"));
                },
              },
              {
                label: 'Індикатори',
                icon: '',
                command: () => {
                  this.onClick(new TabNode("0102", "mi_list_indicators", "Індикатори",
                    "ПЕРЕЛІК ЗАСОБІВ ВИМІРЮВАЛЬНОЇ ТЕХНІКИ ПЕРЕВЕДЕНИХ У РОЗРЯД ІНДИКАТОРІВ"));
                },
              },
              {
                label: 'Довготривале зберігання',
                icon: '',
                command: () => {
                  this.onClick(new TabNode("0103", "mi_list_long_term_storage", "Довготривале зберігання",
                    "ПЕРЕЛІК ЗАСОБІВ ВИМІРЮВАЛЬНОЇ ТЕХНІКИ ПЕРЕВЕДЕНИХ НА ДОВГОТРИВАЛЕ ЗБЕРІГАННЯ"));
                },
              },
              {
                label: 'Технічний контроль',
                icon: '',
                command: () => {
                  this.onClick(new TabNode("0104", "mi_list_technical_control", "Технічний контроль",
                    "ПЕРЕЛІК ЗАСОБІВ ВИМІРЮВАЛЬНОЇ ТЕХНІКИ, ЩО ПІДЛЯГАЮТЬ ТЕХНІЧНОМУ КОНТРОЛЮ"));
                },
              },
              {
                label: 'Повірка',
                icon: '',
                command: () => {
                  this.onClick(new TabNode("0105", "mi_list_verification", "Повірка",
                    "ПЕРЕЛІК ЗАСОБІВ ВИМІРЮВАЛЬНОЇ ТЕХНІКИ, ЩО ПІДЛЯГАЮТЬ ПОВІРЦІ"));
                },
              },
            ],

          },
          {
            label: 'Графіки',
            icon: 'pi pi-fw pi-calendar-minus',
            items: [

              {
                label: 'Графік повірки',
                icon: '',
                command: () => {
                  this.onClick(new TabNode("0201", "mi_schedule_verification", "Графік повірки",
                    "ГРАФІК ПОВІРКИ ЗАСОБІВ ВИМІРЮВАЛЬНОЇ ТЕХНІКИ"));
                },
              },

              {
                label: 'Графік технічного контролю',
                icon: '',
                command: () => {
                  this.onClick(new TabNode("0202", "mi_schedule_technical_control", "Графік технічного контролю",
                    "ГРАФІК ТЕХНІЧНОГО КОНТРОЛЮ ЗАСОБІВ ВИМІРЮВАЛЬНОЇ ТЕХНІКИ"));
                },
              },
            ],
          }
        ]
      },
      {
        label: 'Випробувальне обладнання',
        icon: 'pi pi-fw pi-bolt',
        items: [
          {
            label: 'Перелік випробувального обладнання',
            icon: 'pi pi-fw pi-list'
          },
          {
            label: 'Графік перевірки випробувального обладнання',
            icon: 'pi pi-fw pi-calendar-minus'
          }
        ]
      },
      {
        label: 'Паспорт метрологічного забезпеяення',
        icon: 'pi pi-fw pi-credit-card',
        items: [
          {
            label: 'Титульний аркуш',
            icon: ''
          },
          {
            label: 'Форма 1',
            icon: ''
          },
          {
            label: 'Форма 2',
            icon: '',
          },
          {
            label: 'Форма 3',
            icon: '',
          },
          {
            label: 'Форма 4',
            icon: '',
          },
          {
            label: 'Форма 5',
            icon: '',
          },
          {
            label: 'Форма 6',
            icon: '',
          },
          {
            label: 'Форма 7',
            icon: '',
          },
          {
            label: 'Форма 8',
            icon: '',
          },
          {
            label: 'Форма 9',
            icon: '',
          },
          {
            label: 'Форма 10',
            icon: '',
          }
        ]
      },
      {
        label: 'Нормативна документація',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Методики перевірки випробувального обладнання',
            icon: '',
          },
          {
            label: 'Методики технічного контролю',
            icon: '',
          },
          {
            label: 'Методики придатності засобу допускового контролю',
            icon: '',
          },
          {
            label: 'Методики вимірювань, випробувань',
            icon: '',
          },
          {
            label: 'Паспорта ЗВТ, ЗДК, ВО',
            icon: '',
          },
          {
            label: 'Інші',
            icon: '',
          }
        ]
      },
      {
        label: 'Довідники',
        icon: 'pi pi-fw pi-table',
        items: [
          {
            label: 'Підприємства',
            icon: 'pi pi-fw pi-link',
            items: [
              {
                label: 'Організації 1 рівня - Укрзалізниця',
                icon: '',
              },
              {
                label: 'Організації 2 рівня - департаменти',
                icon: '',
              },
              {
                label: 'Організації 3 рівня - філії, регіональні філії',
                icon: '',
              },
              {
                label: 'Організації 4 рівня - служби',
                icon: '',
              },
              {
                label: 'Організації 5 рівня - структурні підрозділи',
                icon: '',
              },
            ]
          },
          {
            label: 'Види вимірювань',
            icon: '',
          },
          {
            label: 'Види метрологічного обслуговування',
            icon: '',
          },
          {
            label: 'Сфери застосування ЗВТ, ЗДК, ВО',
            icon: '',
          },
          {
            label: 'Види НД',
            icon: '',
          },
          {
            label: '',
            icon: '',
          },
          {
            label: '',
            icon: '',
          },
          {
            label: '',
            icon: '',
          }
        ]
      }
    ];
  }

  onClick(tabNode: TabNode) {
    this.tabViewService.addTab(tabNode)
  }
}
