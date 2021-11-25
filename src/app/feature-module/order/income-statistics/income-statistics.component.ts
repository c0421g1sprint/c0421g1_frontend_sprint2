import {Component, OnInit} from '@angular/core';
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
  incomeWithDateDto: IIncomeWithDateDto = new IIncomeWithDateDto(0);

  public barChartColors = [{backgroundColor: ["red", "orange", "blue", "cornflowerblue", "green"]}];
  public barChartType = "bar";
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  }
  public barChartLabels = ["Thu nhập được tính", "Hôm nay", "Tuần này", "Tháng này", "Năm này"];
  public barChartLegend  = false;
  public barChartData = [{data: [0,0,0,0,0]}];

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
      }
      this.barChartData[0].data = [
        this.incomeWithDateDto.incomeWithDate,
        this.statisticsIncome[0].incomes,
        this.statisticsIncome[1].incomes,
        this.statisticsIncome[2].incomes,
        this.statisticsIncome[3].incomes];
    });
  }

  getIncomeWithDate() {
    this.orderService.getIncomeWithDate(this.startDate, this.endDate).subscribe(data => {
        if (data == null) {
          this.incomeWithDateDto.incomeWithDate = 0;
          this.barChartData[0].data = [
            0,
            this.statisticsIncome[0].incomes,
            this.statisticsIncome[1].incomes,
            this.statisticsIncome[2].incomes,
            this.statisticsIncome[3].incomes];
          this.snackBarService.showSnackbar("Chưa có thu nhập cho khoảng thời gian này!", 'error');
        } else {
          this.incomeWithDateDto = data;
          this.barChartData[0].data = [
            this.incomeWithDateDto.incomeWithDate,
            this.statisticsIncome[0].incomes,
            this.statisticsIncome[1].incomes,
            this.statisticsIncome[2].incomes,
            this.statisticsIncome[3].incomes];
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
          this.statisticsIncome[3].incomes];
        this.snackBarService.showSnackbar("Ngày bắt đầu phải trước ngày kết thúc", 'error');
      }else {
        this.incomeWithDateDto.incomeWithDate = 0;
        this.barChartData[0].data = [
          0,
          this.statisticsIncome[0].incomes,
          this.statisticsIncome[1].incomes,
          this.statisticsIncome[2].incomes,
          this.statisticsIncome[3].incomes];
        this.snackBarService.showSnackbar("Vui lòng nhập ngày bắt đầu và ngày kết thúc", 'error');
      }
      });
  }
}
