import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {Apollo} from "apollo-angular";
import {
  DeleteDataGQL, GenerateSDataGQL,
  McuGQL,
  PlaceGQL, SDataGQL,
  SensorGQL,
  SmcpCrossGQL,
  SmCrossGQL,
  TableColumnsGQL,
  TableNamesGQL
} from "../../../generated/graphql";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})

export class DataComponent implements OnInit {

  columns: string[] = [];
  tables: string[] = [];
  selectedTable: string = null;
  dataFromTable = [];
  loading = false;

  constructor(
    private notification: NzNotificationService,
    private apollo: Apollo,
    private tableNamesGQL: TableNamesGQL,
    private sensorGQL: SensorGQL,
    private mcuGQL: McuGQL,
    private tableColumnsGQL: TableColumnsGQL,
    private placeGQL: PlaceGQL,
    private smCrossGQL: SmCrossGQL,
    private smcpCrossGQL: SmcpCrossGQL,
    private sDataGQL: SDataGQL,
    private httpClient: HttpClient,
    private deleteDataGQL: DeleteDataGQL,
    private generateSDataGQL: GenerateSDataGQL
  ) { }

  ngOnInit(): void {
    this.getTables();
    console.log(window.location.href);
  }

  getTableColumns(name: string): void {
    this.tableColumnsGQL
      .fetch({ name })
      .subscribe(result => this.columns = result?.data?.tableColumns)
  }

  getTables(): void {
    this.tableNamesGQL.fetch().subscribe((result: any) => this.tables = result?.data?.tableNames)
  }

  getDataFromTables(tableName: string): void {
    this.loading = true;
    switch (tableName) {
      case 'mcu': {
        this.mcuGQL.fetch().subscribe((result) =>{
          this.dataFromTable = result?.data?.mcu;
          console.log(this.dataFromTable);
          this.loading = false;
        });
        break;
      }
      case 'sensor': {
        this.sensorGQL.fetch().subscribe((result) =>{
          this.dataFromTable = result?.data?.sensor;
          this.loading = false;
        });
        break;
      }
      case 'place': {
        this.placeGQL.fetch().subscribe((result) =>{
          this.dataFromTable = result?.data?.place;
          this.loading = false;
        });
        break;
      }
      case 's_m_cross': {
        this.smCrossGQL.fetch().subscribe((result) =>{
          this.dataFromTable = result?.data?.SMCross;
          this.loading = false;
        });
        break;
      }
      case 'smc_p_cross': {
        this.smcpCrossGQL.fetch().subscribe((result) =>{
          this.dataFromTable = result?.data?.SMCPCross;
          this.loading = false;
          console.log(this.dataFromTable)
        });
        break;
      }
      case 'sdata': {
        this.httpClient.get(environment.domain + '/data', {
          params: new HttpParams().set('table', 'sdata')
        }).subscribe((result: any) => {
            this.dataFromTable = result;
            this.loading = false;
          });
        break;
      }

      default: {
        this.dataFromTable = [];
        this.loading = false;
        break;
      }

    }

  }

  selectTable(event: Event): void {
    this.getTableColumns(String(event));
    this.getDataFromTables(String(event));
  }

  generateData(): void {
    this.generateSDataGQL.mutate().subscribe(result => {
      this.getDataFromTables(this.selectedTable);
      this.createBasicNotification(result?.data?.generateSData)
    })
  }

  createBasicNotification(title: string): void {
    this.notification.blank(
      title,
      null,
      { nzPlacement: 'bottomLeft'}
    );
  }

  deleteData(): void {
    this.deleteDataGQL.mutate({
      table: 'sdata'
    }).subscribe(result => {
      this.createBasicNotification(result?.data?.deleteData);
      this.getDataFromTables(this.selectedTable);
    })
  }

}
