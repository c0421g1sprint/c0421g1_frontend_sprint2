import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../core-module/order/order.service";
import {IIncomesDto} from "../../../entity/IIncomesDto";
import {IIncomeWithDateDto} from "../../../entity/IIncomeWithDateDto";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {registerLocaleData} from "@angular/common";
import localeVi from '@angular/common/locales/vi'
registerLocaleData(localeVi, "vi-VN");

@Component({
  selector: 'app-income-statistics',
  templateUrl: './income-statistics.component.html',
  styleUrls: ['./income-statistics.component.css']
})
export class IncomeStatisticsComponent implements OnInit {


  statisticsIncome: IIncomesDto[];
  startDate = '';
  endDate = '';
  year = '';
  incomeWithDateDto: IIncomeWithDateDto = new IIncomeWithDateDto(0);

  public barChartColors = [{backgroundColor: ["red", "orange", "blue", "cornflowerblue", "green","white", "orange", "blue", "cornflowerblue", "green","white", "orange", "blue", "cornflowerblue", "green","white"]}
  ];
  public barChartType = "bar";
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }
  public barChartLabels = ["TN tính", "Hôm nay", "Tuần này", "T.1", "T.2", "T.3", "T.4", "T.5", "T.6", "T.7", "T.8", "T.9", "T.10", "T.11", "T.12", "Năm"];
  public barChartLegend  = false;
  public barChartData = [{data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}];



  constructor(private orderService: OrderService,
              private snackBarService: SnackbarService,) {
  }

  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics() {
    this.orderService.getStatisticsIncome(this.year).subscribe(data => {
        this.statisticsIncome = data;
        for (let i = 0; i < this.statisticsIncome.length; i++) {
          if (this.statisticsIncome[i] == null) {
            this.statisticsIncome[i] = new IIncomesDto(0);
          }
        }
      }
      ,error => {
        this.snackBarService.showSnackbar("Chưa có thu nhập cho năm này!", 'error');
      },() =>{
        this.barChartData[0].data = [
          this.incomeWithDateDto.incomeWithDate,
          this.statisticsIncome[0].incomes,
          this.statisticsIncome[1].incomes,
          this.statisticsIncome[2].incomes,
          this.statisticsIncome[3].incomes,
          this.statisticsIncome[4].incomes,
          this.statisticsIncome[5].incomes,
          this.statisticsIncome[6].incomes,
          this.statisticsIncome[7].incomes,
          this.statisticsIncome[8].incomes,
          this.statisticsIncome[9].incomes,
          this.statisticsIncome[10].incomes,
          this.statisticsIncome[11].incomes,
          this.statisticsIncome[12].incomes,
          this.statisticsIncome[13].incomes,
          this.statisticsIncome[14].incomes];
      });
  }

  getIncomeWithDate() {
    this.orderService.getIncomeWithDate(this.startDate, this.endDate).subscribe(data => {
        if (data == null) {
          this.snackBarService.showSnackbar("Chưa có thu nhập cho khoảng thời gian này!", 'error');
        } else {
          this.incomeWithDateDto = data;
          this.barChartData[0].data = [
            this.incomeWithDateDto.incomeWithDate,
            this.statisticsIncome[0].incomes,
            this.statisticsIncome[1].incomes,
            this.statisticsIncome[2].incomes,
            this.statisticsIncome[3].incomes,
            this.statisticsIncome[4].incomes,
            this.statisticsIncome[5].incomes,
            this.statisticsIncome[6].incomes,
            this.statisticsIncome[7].incomes,
            this.statisticsIncome[8].incomes,
            this.statisticsIncome[9].incomes,
            this.statisticsIncome[10].incomes,
            this.statisticsIncome[11].incomes,
            this.statisticsIncome[12].incomes,
            this.statisticsIncome[13].incomes,
            this.statisticsIncome[14].incomes];
        }
      },
      error => {
        if(error.status == "406"){
          this.incomeWithDateDto.incomeWithDate = 0;
          this.barChartData[0].data = [
            0,
            this.statisticsIncome[0].incomes,
            this.statisticsIncome[1].incomes,
            this.statisticsIncome[2].incomes,
            this.statisticsIncome[3].incomes,
            this.statisticsIncome[4].incomes,
            this.statisticsIncome[5].incomes,
            this.statisticsIncome[6].incomes,
            this.statisticsIncome[7].incomes,
            this.statisticsIncome[8].incomes,
            this.statisticsIncome[9].incomes,
            this.statisticsIncome[10].incomes,
            this.statisticsIncome[11].incomes,
            this.statisticsIncome[12].incomes,
            this.statisticsIncome[13].incomes,
            this.statisticsIncome[14].incomes];
          this.snackBarService.showSnackbar("Ngày bắt đầu phải trước ngày kết thúc!", 'error');
        }else {
          this.incomeWithDateDto.incomeWithDate = 0;
          this.barChartData[0].data = [
            0,
            this.statisticsIncome[0].incomes,
            this.statisticsIncome[1].incomes,
            this.statisticsIncome[2].incomes,
            this.statisticsIncome[3].incomes,
            this.statisticsIncome[4].incomes,
            this.statisticsIncome[5].incomes,
            this.statisticsIncome[6].incomes,
            this.statisticsIncome[7].incomes,
            this.statisticsIncome[8].incomes,
            this.statisticsIncome[9].incomes,
            this.statisticsIncome[10].incomes,
            this.statisticsIncome[11].incomes,
            this.statisticsIncome[12].incomes,
            this.statisticsIncome[13].incomes,
            this.statisticsIncome[14].incomes];
          this.snackBarService.showSnackbar("Vui lòng nhập ngày bắt đầu và ngày kết thúc", 'error');
        }
      });
  }
}
