import { Component } from '@angular/core';
import { AppService } from './app.service';
import { TimePeriod } from './interface/time-period';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading = true;
  joinDate = new Date('09/07/2010');
  today = new Date();
  timePeriod: TimePeriod;
  loaderMode = 'indeterminate';
  loadingValue = 0;

  constructor(private appService: AppService) {
    this.getTimePeriod();

  }

  getTimePeriod() {
    this.appService.getTimePeriods().subscribe((res: TimePeriod) => {
      this.timePeriod = res;
      this.loaderMode = 'determinate';
      setInterval(() => {
        this.loadingValue = this.loadingValue + 1;
      }, 60);
      setTimeout(() => {
        this.isLoading = false;
      }, 10000);
      setInterval(() => {
        this.timePeriod.seconds = this.timePeriod.seconds + 1;
        if (this.timePeriod.seconds >= 60) {
          this.timePeriod.seconds = 0;
          this.timePeriod.minutes = this.timePeriod.minutes + 1;
        }
        if (this.timePeriod.minutes >= 60) {
          this.timePeriod.minutes = 0;
          this.timePeriod.hours = this.timePeriod.hours + 1;
        }

      }, 1000);
    },
    (error) => {
      this.isLoading = false;
    });
  }
}
