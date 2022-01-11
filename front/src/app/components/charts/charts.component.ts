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
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";

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
  listOfSelectedSensors: number[] = [];
  selectedTimeSegment: number = null;
  sdata = [];
  chartData: {x: string, y: number}[] = [];
  timeLine: string[] = [];
  loading = false;
  dataTypes: string[] = [];
  selectedDate: string = new Date().toISOString();


  constructor(
    private httpClient: HttpClient,
    private mcuGQL: McuGQL,
    private customSensorGQL: CustomSensorGQL,
    private sensorGQL: SensorGQL,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.selectedMcu = params.selectedMcu ? Number(params.selectedMcu) : null;
      if (this.selectedMcu) {
        this.getSensors(this.selectedMcu);
        this.listOfSelectedSensors = params.id?.length ? params.id.map(id => Number(id)) : [];
        if (this.listOfSelectedSensors.length) {
          this.selectedTimeSegment = params.lastHours ? Number(params.lastHours) : null;
          if (this.selectedTimeSegment) {
            this.buildChart();
          }
        }
      }

      this.selectedDate = params.dateTime ?? new Date().toISOString();
    });
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
        width: 2,
      },
    };
  }

  ngOnInit(): void {
    this.getMCU();
  }

  getSensors(mcuId: number) {
    this.listOfSelectedSensors = [];
    this.selectedTimeSegment = null;
    this.customSensorGQL.fetch({
      mcuId
    }).subscribe(result => this.sensors = result.data.customSensor);
  }

  getMCU(): void {
    this.mcuGQL.fetch().subscribe(result => this.mcuList = result?.data?.mcu);
  }

  submit(): void {
    this.loading = true;


    const input = {
      id: this.listOfSelectedSensors,
      lastHours: this.selectedTimeSegment,
      dateTime: this.selectedDate,
    };

    this.buildChart();

    this.router.navigate([], {
      queryParams: {
        selectedMcu: this.selectedMcu,
        ...input,
      },
      queryParamsHandling: 'merge',
    });
  }


  buildChart(): void {
    this.loading = true;
    if (this.listOfSelectedSensors?.length > 1) {

      this.listOfSelectedSensors.forEach((sensor) => {
        this.sensorGQL.fetch({id: sensor}).subscribe(result => {
          this.dataTypes[sensor] = result?.data?.sensor[0]?.data_type;
        });
      });

      this.httpClient.post(environment.domain + '/data/sensors', {
        id: this.listOfSelectedSensors,
        lastHours: this.selectedTimeSegment,
        dateTime: this.selectedDate,
      }).subscribe((result: any) => {

        console.log('result', result);
        result.forEach(line => this.timeLine.push(new Date(line.date_time).toLocaleString()));

        this.chartOptions.series = [];
        this.listOfSelectedSensors.forEach((sensor, i) => {

          this.chartData = [];
          result.forEach((line, lineIndex) => {
            this.chartData.push({
              x: this.timeLine[lineIndex],
              y: line["value" + (i + 1)],
            })
          });
          this.chartOptions.series.push(
            {
              data: this.chartData,
              name:  this.dataTypes[sensor]
            }
          )
        });
        this.loading = false;
      });
    } else {
      this.httpClient.get(environment.domain + '/data', {
        params: new HttpParams()
          .set('table', 'sdata')
          .set('dateTime', this.selectedDate.toString())
          .set('smcpcId', this.listOfSelectedSensors[0])
          .set('lastHours', this.selectedTimeSegment)
      }).subscribe((result: any) => {
        this.sdata = result;
        if (this.sdata.length) {
          this.chartData = [];
          this.sdata.forEach(data => this.chartData.push({
            x: new Date(data.date_time).toLocaleString(),
            y: data.sensor_value,
          }));
          this.sensorGQL.fetch({id: this.listOfSelectedSensors[0]}).subscribe(result => {
            console.log(result);
            this.chartOptions.series = [{
              data: this.chartData,
              name: result?.data?.sensor[0]?.data_type,
            }];
          })
        }
        this.loading = false;
      });
    }
  }

}
