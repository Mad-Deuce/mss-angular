import {Injectable} from '@angular/core';

@Injectable()
export class MiListColumnsService {

  private columns: Map<string, Column> = new Map<string, Column>()
    .set("measurementType", {
      field: "measurementType",
      header: 'Вид\n вимір.',
      tooltip: "Код виду вимірювань",
      filterType: "multi_select",
      filterMatchMode: "in"
    })
    .set("type", {
      field: "type",
      header: 'Найм.\n ЗВТ',
      tooltip: "Найменування ЗВТ",
      filterType: "text",
      filterMatchMode: "~"
    })
    .set("name", {
      field: "name",
      header: 'Тип\n ЗВТ',
      tooltip: "Умовне позначення, тип, система"
    })
    .set("typeName", {
      field: "typeName",
      header: 'Найм.\n ЗВТ',
      tooltip: "Назва, умовне позначення ЗВТ (метрологічні характеристики)"
    })
    .set("manufacturer", {
      field: "manufacturer",
      header: 'Виробник\n ЗВТ',
      tooltip: ""
    })
    .set("number", {
      field: "number",
      header: 'Номер\n ЗВТ',
      tooltip: ""
    })
    .set("numbers", {
      field: "numbers",
      header: 'Номера\n ЗВТ',
      tooltip: "Заводський або інвентарний номер (номери)"
    })
    .set("dates", {
      field: "dates",
      header: 'Дати МО',
      tooltip: "Дата останнього технічного контролю, періодичність (місяців)"
    })
    .set("measurementAccuracy", {
      field: "measurementAccuracy",
      header: 'Точність\n ЗВТ',
      tooltip: "Клас точності, розряд, похибка"
    })
    .set("measurementRange", {
      field: "measurementRange",
      header: 'Діапазон\nвимірювань',
      tooltip: ""
    })
    .set("locate", {
      field: "locate",
      header: 'Розташ.',
      tooltip: "Місце встановлення, експлуатації або зберігання"
    })
    .set("maintenanceOrganization", {
      field: "maintenanceOrganization",
      header: 'Організація\nМО',
      tooltip: "Найменування організації, що виконує повірку або технічний контроль"
    })
    .set("maintenanceType", {
      field: "maintenanceType",
      header: 'Вид\nМО',
      tooltip: "Підлягають повірці або технічному контролю, переведені в індикатори, знаходяться на зберіганні",
      filterType: "multi_select",
      filterMatchMode: "in"
    })
     .set("comment", {
      field: "comment",
      header: 'Примітка',
      tooltip: ""
    })
    .set("month01Count", {
      field: "month01Count",
      header: '01',
      tooltip: "",
      filterType: "none"
    })
    .set("month02Count", {
      field: "month01Count",
      header: '02',
      tooltip: "",
      filterType: "none"
    })
    .set("month03Count", {
      field: "month01Count",
      header: '03',
      tooltip: "",
      filterType: "none"
    })
    .set("month04Count", {
      field: "month01Count",
      header: '04',
      tooltip: "",
      filterType: "none"
    })
    .set("month05Count", {
      field: "month01Count",
      header: '05',
      tooltip: "",
      filterType: "none"
    })
    .set("month06Count", {
      field: "month01Count",
      header: '06',
      tooltip: "",
      filterType: "none"
    })
    .set("month07Count", {
      field: "month01Count",
      header: '07',
      tooltip: "",
      filterType: "none"
    })
    .set("month08Count", {
      field: "month01Count",
      header: '08',
      tooltip: "",
      filterType: "none"
    })
    .set("month09Count", {
      field: "month01Count",
      header: '09',
      tooltip: "",
      filterType: "none"
    })
    .set("month10Count", {
      field: "month01Count",
      header: '10',
      tooltip: "",
      filterType: "none"
    })
    .set("month11Count", {
      field: "month01Count",
      header: '11',
      tooltip: "",
      filterType: "none"
    })
    .set("month12Count", {
      field: "month01Count",
      header: '12',
      tooltip: "",
      filterType: "none"
    })
  ;


  constructor() {
  }

  getColumns(template: string): Column[] {
    if (template == "mi_list_main") return this.getMiListMainColumns();
    if (template == "mi_schedule_technical_control") return this.getMiScheduleTCColumns();
    return [];
  }


  private getMiListMainColumns(): Column[] {
    let result: Column[] = [];
    const keys: string[] = ["measurementType", "type", "name", "manufacturer", "number", "measurementAccuracy",
      "measurementRange", "locate", "maintenanceOrganization", "maintenanceType", "comment"];
    keys.forEach(value => {
      result.push(<Column>this.columns.get(value))
    })

    return result;
  }

  private getMiScheduleTCColumns(): Column[] {
    let result: Column[] = [];
    const keys: string[] = ["measurementType", "typeName", "numbers", "dates",
      "month01Count", "month02Count", "month03Count", "month04Count", "month05Count", "month06Count",
      "month07Count", "month08Count", "month09Count", "month10Count", "month11Count", "month12Count",
    ];
    keys.forEach(value => {
      result.push(<Column>this.columns.get(value))
    })

    return result;
  }
}

export class Column {
  field?: string;
  header?: string;
  tooltip?: string;
  filterType?: string;
  filterMatchMode?: string;
}
