import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzIconModule} from "ng-zorro-antd/icon";
import { MainComponent } from './components/main/main.component';
import { NzLayoutModule } from "ng-zorro-antd/layout";
import {NgApexchartsModule} from "ng-apexcharts";
import { ChartsComponent } from './components/charts/charts.component';

import { SettingOutline, BarChartOutline, DatabaseOutline, ConsoleSqlOutline } from '@ant-design/icons-angular/icons';
import { SettingsComponent } from './components/settings/settings.component';
import { LogsComponent } from './components/logs/logs.component';
import { DataComponent } from './components/data/data.component';
import { PhppgadminComponent } from './components/phppgadmin/phppgadmin.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import { GraphQLModule } from './graphql.module';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";

registerLocaleData(en);

const icons = [ SettingOutline, BarChartOutline, DatabaseOutline, ConsoleSqlOutline ];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ChartsComponent,
    SettingsComponent,
    LogsComponent,
    DataComponent,
    PhppgadminComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzMenuModule,
        NzIconModule,
        NzIconModule.forRoot(icons),
        NzLayoutModule,
        NgApexchartsModule,
        NzTableModule,
        NzGridModule,
        NzSelectModule,
        NzButtonModule,
        NzNotificationModule,
        GraphQLModule,
        NzDatePickerModule
    ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
