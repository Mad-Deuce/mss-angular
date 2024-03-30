import {Injectable} from '@angular/core';

@Injectable()
export class ColumnsService {

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
    // .set("name", {
    //   field: "name",
    //   header: 'Тип\n ЗВТ',
    //   tooltip: "Умовне позначення, тип, система"
    // })
    .set("name", {
      field: "name",
      header: 'Найм.\n ЗВТ',
      tooltip: "Назва, умовне позначення ЗВТ (метрологічні характеристики)"
    })
    .set("numbers", {
      field: "numbers",
      header: 'Номера\n ЗВТ',
      tooltip: "Заводський або інвентарний номер (номери)",
      filterType: "none"
    })
    .set("dates", {
      field: "dates",
      header: 'Дати МО',
      tooltip: "Дата останнього технічного контролю, періодичність (місяців)",
      filterType: "none"
    })
    .set("maintenancePlace", {
      field: "maintenancePlace",
      header: 'Місце МО',
      tooltip: "Місце проведення технічного контролю",
      filterType: "none"
    })
    .set("month01Count", {
      field: "month01Count",
      header: '01',
      tooltip: "",
      filterType: "none"
    })
    .set("month02Count", {
      field: "month02Count",
      header: '02',
      tooltip: "",
      filterType: "none"
    })
    .set("month03Count", {
      field: "month03Count",
      header: '03',
      tooltip: "",
      filterType: "none"
    })
    .set("month04Count", {
      field: "month04Count",
      header: '04',
      tooltip: "",
      filterType: "none"
    })
    .set("month05Count", {
      field: "month05Count",
      header: '05',
      tooltip: "",
      filterType: "none"
    })
    .set("month06Count", {
      field: "month06Count",
      header: '06',
      tooltip: "",
      filterType: "none"
    })
    .set("month07Count", {
      field: "month07Count",
      header: '07',
      tooltip: "",
      filterType: "none"
    })
    .set("month08Count", {
      field: "month08Count",
      header: '08',
      tooltip: "",
      filterType: "none"
    })
    .set("month09Count", {
      field: "month09Count",
      header: '09',
      tooltip: "",
      filterType: "none"
    })
    .set("month10Count", {
      field: "month10Count",
      header: '10',
      tooltip: "",
      filterType: "none"
    })
    .set("month11Count", {
      field: "month11Count",
      header: '11',
      tooltip: "",
      filterType: "none"
    })
    .set("month12Count", {
      field: "month12Count",
      header: '12',
      tooltip: "",
      filterType: "none"
    })
    .set("comment", {
      field: "comment",
      header: 'Примітка',
      tooltip: "",
      filterType: "none"
    })
  ;


  constructor() {
  }

  getColumns(template: string): Column[] {
    if (template == "mi_schedule_technical_control") return this.getMiScheduleTCColumns();
    return [];
  }

  private getMiScheduleTCColumns(): Column[] {
    let result: Column[] = [];
    const keys: string[] = ["measurementType", "name", "numbers", "dates","maintenancePlace",
      "month01Count", "month02Count", "month03Count", "month04Count", "month05Count", "month06Count",
      "month07Count", "month08Count", "month09Count", "month10Count", "month11Count", "month12Count",
      "comment"
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
