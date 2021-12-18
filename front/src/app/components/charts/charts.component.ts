import {Component, OnInit, ViewChild} from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CustomSensor, CustomSensorGQL, Mcu, McuGQL, SensorGQL} from "../../../generated/graphql";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit{
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  mcuList: Mcu[] = [];
  sensors: CustomSensor[] = [];
  timeSegments: number[] = [1, 2, 6, 12, 24];
  selectedMcu: number = null;
  selectedSensor: number = null;
  selectedTimeSegment: number = null;
  sdata = [];
  chartData: {x: string, y: number}[] = [];
  loading = true;

  constructor(
    private httpClient: HttpClient,
    private mcuGQL: McuGQL,
    private customSensorGQL: CustomSensorGQL,
    private sensorGQL: SensorGQL,
  ) {
    this.chartOptions = {
      series: [
        {
          data: []
        }
      ],
      chart: {
        height: 500,
        type: "line",
      },
      noData: {
        text: 'Нет данных',
      },
      stroke: {
        show: true,
        //curve: 'smooth',
        //lineCap: 'butt',
        //colors: undefined,
        width: 2,
        //dashArray: 0,
      },
    };
  }

  ngOnInit(): void {
    this.getMCU();
  }

  getSensors(mcuId: number) {
    this.selectedSensor = null;
    this.selectedTimeSegment = null;
    this.customSensorGQL.fetch({
      mcuId
    }).subscribe(result => this.sensors = result.data.customSensor);
  }

  getMCU(): void {
    this.mcuGQL.fetch().subscribe(result => this.mcuList = result?.data?.mcu);
  }

  buildChart(): void {
    this.loading = true;
    this.httpClient.get('http://localhost:3000/api/data', {
      params: new HttpParams().set('table', 'sdata').set('smcpcId', this.selectedSensor).set('lastHours', this.selectedTimeSegment)
    }).subscribe((result: any) => {
      this.sdata = result;
      if (this.sdata.length) {
        this.chartData = [];
        this.sdata.forEach(data => this.chartData.push({
          x: new Date(data.date_time).toLocaleString(),
          y: data.sensor_value,
        }));
        this.chartOptions.series = [{
          data: this.chartData
        }];
        this.sensorGQL.fetch({id: this.selectedSensor}).subscribe(result => {
          console.log(result);
          this.chartOptions.yaxis = [{
            title: {
              text: result?.data?.sensor[0]?.data_type,
            },
          }];
        })
      }
    });
  }

}
