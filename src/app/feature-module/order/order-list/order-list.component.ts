import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../core-module/order/order.service";
import {IOrders} from "../../../entity/IOrders";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {OrderDetailComponent} from "../order-detail/order-detail.component";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderList: IOrders[]; //bil list
  searchCode: string = "null"; //search for bill code
  searchDate: string = "null"; //search for create date

  currentPage: number = 0; //current page
  totalPage: number = 0;  //total page
  pageSize: number = 0;

  priceList: number[] = []; //price list of bill


  constructor(private orderService: OrderService,
              private snackBar: SnackbarService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getList(this.searchCode, this.searchDate, this.currentPage);
  }

  //DanhNT coding
  getList(code: string, date: string, page: number) {
    this.orderService.showBillList(code, date, page).subscribe(list => {
      this.orderList = list.content;
      this.totalPage = list.totalPages;
      this.pageSize = list.pageable.pageSize;
      this.currentPage = page;
      console.log(this.orderList);
      this.getPrice();
    }, error => {
      if (error.status == '406') {
        this.snackBar.showSnackbar("Danh sách bạn cần không có!", "error");
      }
    });
  }

  getPrice() {
    for (let i = 0; i < this.orderList.length; i++) {
      let tempPrice = 0;
      let totalPrice = 0;
      for (let item of this.orderList[i].orderDetails) {
        tempPrice = item.fad.fadPrice * item.quantity;
        totalPrice += tempPrice;
      }
      this.priceList[i] = totalPrice;
    }
    console.log(this.priceList);
  }

  nextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
      this.getList(this.searchCode, this.searchDate, this.currentPage);
    } else {
      this.snackBar.showSnackbar("Không có trang tiếp theo!!", "error")
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getList(this.searchCode, this.searchDate, this.currentPage);
    } else {
      this.snackBar.showSnackbar("Không có trang tiếp theo!!", "error")
    }
  }

  forwardTo(value: string) {
    if (Number(value) <= this.totalPage && Number(value) > 0) {
      this.currentPage = Number(value) - 1;
      this.ngOnInit();
    } else {
      this.snackBar.showSnackbar("Trang bạn nhập vào không có", "error");
      this.ngOnInit();
    }
  }

  findAdv(code: string, date: string) {
    this.searchCode = code;
    this.searchDate = date;
    this.currentPage = 0;
    if (code == '') {
      this.searchCode = "null";
    }
    if (date == '') {
      this.searchDate = "null";
    }
    console.log(this.searchCode);
    console.log(this.searchDate);
    this.ngOnInit();
  }


  viewDetail(item: IOrders, total: number) {
    this.matDialog.open(OrderDetailComponent,
      {
        data: {order: item,totalPrice: total},
        minHeight:'200px',minWidth: '550px',
        maxHeight: '900px',
        panelClass: 'my-font-bg',
      }
    );
  }
}
