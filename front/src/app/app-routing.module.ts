import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {ChartsComponent} from "./components/charts/charts.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {DataComponent} from "./components/data/data.component";
import {PhppgadminComponent} from "./components/phppgadmin/phppgadmin.component";

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'charts', component: ChartsComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'data', component: DataComponent},
  {path: 'phppgAdmin', component: PhppgadminComponent},
  {path: '', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
