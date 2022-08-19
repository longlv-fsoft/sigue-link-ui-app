import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ThemeOption } from 'ngx-echarts';
import { Subscription } from 'rxjs';
import { ThemeControlService } from '../../services/theme-control.service';
import { LightTheme } from './themes-data';

@Component({
  selector: 'app-chart-instance',
  templateUrl: './chart-instance.component.html',
  styleUrls: ['./chart-instance.component.scss']
})
export class ChartInstanceComponent implements OnInit, OnDestroy {

  initOpts: any = {};
  @Input('options')
  options: any = {};

  @Input('updatedOptions')
  updatedOptions: any = {};
  
  @Input('loading')
  isLoading: boolean = false;

  private subscriptions: Subscription[] = [];
  theme: string | ThemeOption = LightTheme;
  chartInstance: any;

  constructor(private themeControlService: ThemeControlService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.themeControlService.themeChanged().subscribe(theme => {
      switch(theme) {
        case ThemeControlService.DARK_THEME:
          this.theme = 'dark';
          break;
        case ThemeControlService.LIGHT_THEME:
          this.theme = LightTheme
          break;
        default:
          break;
      }
    }));
  }

  onChartInit(e: any): void {
    this.chartInstance =  e;
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

}
