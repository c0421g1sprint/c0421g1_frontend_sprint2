import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js";
import {OrderService} from "../../../core-module/order/order.service";
import {IIncomesDto} from "../../../entity/IIncomesDto";
import {IIncomeWithDateDto} from "../../../entity/IIncomeWithDateDto";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";

@Component({
  selector: 'app-income-statistics',
  templateUrl: './income-statistics.component.html',
  styleUrls: ['./income-statistics.component.css']
})
export class IncomeStatisticsComponent implements OnInit {

  statisticsIncome: IIncomesDto[];
  startDate = '';
  endDate = '';
  xValues = ["Thu nhập được tính", "Hôm nay", "Tuần này", "Tháng này", "Năm này"];
  yValues = [0,0,0,0,0];
  barColors = ["red", "orange", "blue", "cornflowerblue", "green"];

  incomeWithDateDto: IIncomeWithDateDto = new IIncomeWithDateDto(0);

  constructor(private orderService: OrderService,
              private snackBarService: SnackbarService,) {
  }

  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics() {
    this.orderService.getStatisticsIncome().subscribe(data => {
      this.statisticsIncome = data;
      for (let i = 0; i < this.statisticsIncome.length; i++) {
        if (this.statisticsIncome[i] == null) {
          this.statisticsIncome[i] = new IIncomesDto(0);
        }
        this.yValues[i+1] = this.statisticsIncome[i].incomes;
      }

      let chart = new Chart("myChart", {
        type: "bar",
        data: {
          labels: this.xValues,
          datasets: [{
            backgroundColor: this.barColors,
            data: this.yValues
          }]
        },
        options: {
          title: {
            display: true,
          },
          legend: {display: false}
        }
      });
      chart.render();
    });
  }

  getIncomeWithDate() {

    this.orderService.getIncomeWithDate(this.startDate, this.endDate).subscribe(data => {
        if (data == null) {
          this.yValues[0] = 0;
          this.incomeWithDateDto.incomeWithDate = 0;
          this.snackBarService.showSnackbar("Chưa có thu nhập cho khoảng thời gian này!", 'error');
        } else {
          this.incomeWithDateDto = data;
          this.yValues[0] = this.incomeWithDateDto.incomeWithDate;
        }
        this.ngOnInit();
      },
      error => {
        this.incomeWithDateDto.incomeWithDate = 0;
        this.snackBarService.showSnackbar("Vui lòng nhập ngày bắt đầu và ngày kết thúc", 'error');
        this.ngOnInit();
      });
  }
}
