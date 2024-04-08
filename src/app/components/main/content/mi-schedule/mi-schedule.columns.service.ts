import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class ColumnsService implements OnInit {

  private columns: Map<string, ScheduleColumn> = new Map<string, ScheduleColumn>();


  constructor() {
    this.setMeasurementTypeColumns();
    this.setLegalMetrologyColumns();
    this.setNamesColumns();
    this.setDatesColumns();
    this.setCommentsColumns();
    this.setCountColumns();
    this.setEmptyColumns();
  }

  ngOnInit(): void {
    // this.setMeasurementTypeColumns();
    // this.setLegalMetrologyColumns();
    // this.setNamesColumns();
    // this.setDatesColumns();
    // this.setCommentsColumns();
    // this.setCountColumns();
    // this.setEmptyColumns();
  }


  getColumns(template: string): ScheduleColumn[] {
    if (template == "mi_schedule_technical_control") return this.getMiScheduleTCColumns();
    if (template == "mi_schedule_verification") return this.getMiScheduleVColumns();
    return [];
  }

  private getMiScheduleVColumns(): ScheduleColumn[] {
    let result: ScheduleColumn[] = [];
    const keys: string[] = ["legalMetrologyCode", "type", "name", "measurementAccuracy", "measurementRange",
      "maintenancePeriod", "maintenanceDate",
      "month01Count", "month02Count", "month03Count", "month04Count", "month05Count", "month06Count",
      "month07Count", "month08Count", "month09Count", "month10Count", "month11Count", "month12Count"
    ];
    keys.forEach(value => {
      result.push(<ScheduleColumn>this.columns.get(value))
    })

    return result;
  }

  private getMiScheduleTCColumns(): ScheduleColumn[] {
    let result: ScheduleColumn[] = [];
    const keys: string[] = ["measurementType", "typeName", "numbers", "dates", "maintenancePlace",
      "month01Count", "month02Count", "month03Count", "month04Count", "month05Count", "month06Count",
      "month07Count", "month08Count", "month09Count", "month10Count", "month11Count", "month12Count",
      "comment"
    ];
    keys.forEach(value => {
      result.push(<ScheduleColumn>this.columns.get(value))
    })

    return result;
  }


  private setNamesColumns() {
    this.columns
      .set("type", {
        field: "type",
        header: 'Тип\n ЗВТ',
        tooltip: "Категорія ЗВТ",
        filterType: "text",
        filterMatchMode: "~"
      })
      .set("name", {
        field: "name",
        header: 'Найм.\n ЗВТ',
        tooltip: "Умовне позначення ЗВТ",
        filterType: "text",
        filterMatchMode: "~"
      })
      .set("typeName", {
        field: "name",
        header: 'Найм.\n ЗВТ',
        tooltip: "Назва, умовне позначення ЗВТ (метрологічні характеристики)",
        filterType: "text",
        filterMatchMode: "~"
      })

      .set("measurementAccuracy", {
        field: "measurementAccuracy",
        header: 'Клас\n точності',
        tooltip: "Клас точності, розряд, похибка",
        filterType: "none"
      })
      .set("measurementRange", {
        field: "measurementRange",
        header: 'Діапазон\n вимірювання',
        tooltip: "",
        filterType: "none"
      })
  }

  private setDatesColumns() {
    this.columns
      .set("maintenancePeriod", {
        field: "maintenancePeriod",
        header: 'Інтервал\n МО',
        tooltip: "Міжповірочний інтервал, рік",
        filterType: "none"
      })
      .set("maintenanceDate", {
        field: "maintenanceDate",
        header: 'Дата\n МО',
        tooltip: "Дата останньої повірки (місяць, рік)",
        filterType: "none"
      })
      .set("dates", {
        field: "dates",
        header: 'Дати МО',
        tooltip: "Дата останнього технічного контролю, періодичність (місяців)",
        filterType: "none"
      })
  }

  private setCommentsColumns() {
    this.columns
      .set("comment", {
        field: "comment",
        header: 'Примітка',
        tooltip: "",
        filterType: "none"
      })
  }

  private setMeasurementTypeColumns() {
    this.columns
      .set("measurementType", {
        field: "measurementType",
        header: 'Вид\n вимір.',
        tooltip: "Код виду вимірювань",
        filterType: "multi_select",
        filterMatchMode: "in"
      })
  }

  private setCountColumns() {
    this.columns
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
  }

  private setLegalMetrologyColumns() {
    this.columns
      .set("legalMetrologyCode", {
        field: "legalMetrologyCode",
        header: 'Сфера\n ЗРМ.',
        tooltip: "Умовне позначення сфери законодавчо регульованої метро-логії ",
        filterType: "multi_select",
        filterMatchMode: "in"
      })
  }

  private setEmptyColumns() {
    this.columns
      .set("maintenancePlace", {
        field: "maintenancePlace",
        header: 'Місце МО',
        tooltip: "Місце проведення технічного контролю",
        filterType: "none"
      })
      .set("maintenancePlaceV", {
        field: "maintenancePlace",
        header: 'Місце МО',
        tooltip: "Місце проведення повірки",
        filterType: "none"
      })
      .set("verificationCost", {
        field: "verificationCost",
        header: 'Вартість\n повірки',
        tooltip: "Вартість повірки 1 од. ЗВТ без ПДВ станом на______",
        filterType: "none"
      })
      .set("instrumentCode", {
        field: "instrumentCode",
        header: 'Код\n ЗВТ',
        tooltip: "Код ЗВТ відповідно до норм часу",
        filterType: "none"
      })
  }
}

export class ScheduleColumn {
  field?: string;
  header?: string;
  tooltip?: string;
  filterType?: string;
  filterMatchMode?: string;
}
