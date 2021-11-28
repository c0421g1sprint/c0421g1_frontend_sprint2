import { Component, OnInit } from '@angular/core';
import {ITables} from "../../../entity/ITables";
import {IOrders} from "../../../entity/IOrders";
import {ActivatedRoute} from "@angular/router";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {OrderDetailService} from "../../../core-module/order/order-detail.service";
import {IOrderDetail} from "../../../entity/IOrderDetail";

@Component({
  selector: 'app-order-on-service',
  templateUrl: './order-on-service.component.html',
  styleUrls: ['./order-on-service.component.css']
})
export class OrderOnServiceComponent implements OnInit {

  tableOnServiceList: ITables[];
  flicker: string = 'animate-flicker';
  order: IOrders[];
  totalPage: number;
  page = 0;
  pageNumberInput: any;
  tables: ITables;
  id: number = 1;
  orderDetail: IOrderDetail[];
  totalMoney: number;
  focusImg: string = 'assets/img-TaiHVK/table-icon-2.png';
  focusImg2: string = 'assets/img-TaiHVK/table-icon-3.png';
  focusImg3: string = 'assets/img-TaiHVK/table-icon.png';

  constructor(private orderDetailService: OrderDetailService, private activatedRoute: ActivatedRoute,
              private matSnackBar: SnackbarService) {
    this.seeDetail(this.id);
  }

  ngOnInit(): void {
    this.getTableList();
  }

  getTableList() {
    this.orderDetailService.showTableOnService(this.page).subscribe(value => {
      // @ts-ignore
      this.tableOnServiceList = value.content;
      // @ts-ignore
      this.totalPage = value.totalPages;
      console.log(this.tableOnServiceList);
    })
  }


  nextPage() {
    if (this.page < this.totalPage - 1) {
      this.page = this.page + 1;
      this.pageNumberInput = this.page + 1;
    } else {
      this.matSnackBar.showSnackbar('Bạn đang ở trang cuối', 'error')
    }
    this.ngOnInit();
  }

  previousPage() {
    if (this.page > 0) {
      this.page = this.page - 1;
    } else {
      this.page = 0;
      this.matSnackBar.showSnackbar('Bạn đang ở trang đầu', 'error')
    }
    this.pageNumberInput = this.page + 1;
    this.ngOnInit();
  }


  changeTableOnServiceStatus(id: number) {
    this.orderDetailService.changeTableOnServiceStatus(id).subscribe(() => {
      let requestType: String;
      if (this.tables.onService == 1) {
        requestType = ' - GỌI MÓN';
      } else {
        requestType = ' - GỌI PHỤC VỤ';
      }
      this.matSnackBar.showSnackbar('Đã xác nhận yêu cầu từ bàn số: ' + this.tables.tableCode + requestType, 'success');
    })
  }

  changeTableOnServiceStatusNoNotification(id: number) {
    this.orderDetailService.changeTableOnServiceStatus(id).subscribe(() => {
    })
  }


  searchPage() {
    if (this.pageNumberInput - 1 < this.totalPage && this.pageNumberInput - 1 >= 0) {
      this.page = this.pageNumberInput - 1;
    } else {
      this.matSnackBar.showSnackbar('Nhập sai số!', 'error');
    }
    this.ngOnInit();
  }

  getTotalMoney(id: number) {
    this.orderDetailService.showOrderDetailSum(id).subscribe(value => {
      this.totalMoney = value;
      console.log(this.totalMoney);
    })
  }

  seeDetail(id: number) {
    this.orderDetailService.findOrderById(id).subscribe(value => {
      this.getTotalMoney(id);
      this.order = value;
      this.id = id;
      this.orderDetail = value.orderDetails;
      this.tables = value.tables;
      if (this.tables.onService == 1 || this.tables.onService == 2) {
        this.changeTableOnServiceStatus(id);
        this.seeDetail(id);
      }
      console.log(this.order);
      console.log(this.tables.onService);
    }, error => {

    });
    this.ngOnInit();
  }

  resetTableStatus(id: number) {
    this.orderDetailService.resetTableStatus(id).subscribe(() => {
      this.matSnackBar.showSnackbar('Reset trạng thái bàn thành công!', 'success');
      this.seeDetail(id);
    });
    this.ngOnInit();
  }

  writeBillAndResetTableStatus(id: number) {
    this.orderDetailService.resetTableStatus(id).subscribe(() => {
      this.changeTableOnServiceStatusNoNotification(id);
      this.matSnackBar.showSnackbar('Đã xuất hóa đơn!', 'success');
      this.ngOnInit();
      this.seeDetail(id);
    });
  }

  writeBill(id: number) {
    this.orderDetailService.updateOrder(id).subscribe(() => {
      this.writeBillAndResetTableStatus(id);
    })
  }
}
