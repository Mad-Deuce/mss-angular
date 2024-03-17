import {Injectable} from '@angular/core';

@Injectable()
export class ColumnsService {

  private columns: Map<string, Column> = new Map<string, Column>()
    .set("measurementType", {field: "measurementType", header: 'Вид\n вимір.', tooltip: "Код виду вимірювань"})
    .set("type", {field: "type", header: 'Найм.\n ЗВТ', tooltip: "Найменування ЗВТ"})
    .set("name", {field: "name", header: 'Тип\n ЗВТ', tooltip: "Умовне позначення, тип, система"})
    .set("manufacturer", {field: "manufacturer", header: 'Виробник\n ЗВТ', tooltip: ""})
    .set("number", {field: "number", header: 'Номер\n ЗВТ', tooltip: ""})
    .set("measurementAccuracy", {
      field: "measurementAccuracy",
      header: 'Точність\n ЗВТ',
      tooltip: "Клас точності, розряд, похибка"
    })
    .set("measurementRange", {field: "measurementRange", header: 'Діапазон\nвимірювань', tooltip: ""})
    .set("locate", {field: "locate", header: 'Розташ.', tooltip: "Місце встановлення, експлуатації або зберігання"})
    .set("maintenanceOrganization", {
      field: "maintenanceOrganization",
      header: 'Організація\nМО',
      tooltip: "Найменування організації, що виконує повірку або технічний контроль"
    })
    .set("maintenanceType", {
      field: "maintenanceType",
      header: 'Вид\nМО',
      tooltip: "Підлягають повірці або технічному контролю, переведені в індикатори, знаходяться на зберіганні"
    })
    .set("comment", {field: "comment", header: 'Примітка', tooltip: ""});


  constructor() {
  }

  getColumns(template: string): Column[] {
    if (template == "mi_list_main") return this.getMiListMainColumns();
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


}

export class Column {
  field?: string;
  header?: string;
  tooltip?: string;
}
