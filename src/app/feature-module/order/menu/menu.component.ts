import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../core-module/food_and_drink/category.service";
import {ICategory} from "../../../entity/ICategory";
import {FoodAndDrinkService} from "../../../core-module/food_and_drink/food-and-drink.service";
import {IFoodAndDrink} from "../../../entity/IFoodAndDrink";
import {ActivatedRoute, Params} from "@angular/router";
import {BehaviorSubject, of, Subscription} from "rxjs";
import {CartService} from "../../../core-module/food_and_drink/cart.service";
import {OrderService} from "../../../core-module/order/order.service";
import {ITables} from "../../../entity/ITables";
import {TableService} from "../../../core-module/table/table.service";
import {element} from "protractor";
import {IOrders} from "../../../entity/IOrders";
import {FormControl, FormGroup} from "@angular/forms";
import {IOrderDetail} from "../../../entity/IOrderDetail";
import {CountdownComponent, CountdownConfig, CountdownModule, CountdownTimer} from "ngx-countdown";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteOrderComponent} from "../delete-order/delete-order.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title = "hello";
  ListCategory: ICategory[] = [];
  FoodAndDrink: IFoodAndDrink[] = [];
  FoodById: IFoodAndDrink;
  check: boolean = false;
  checkDelete: boolean = false;
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public product: any;


  quantity: number = 1;
  public table: ITables;
  // order
  orderList: IOrders;

  //phan trang
  totalLength: any;
  page: number = 1;
  id: number;

  // new order vs 1 table ms
  order: IOrders;

  //call
  thanhtoan: string = 'Thanh toán';
  phucVu: string = 'Gọi phục vụ'
  //delete
  time: number;
  orderForm: FormGroup = new FormGroup({
    tables: new FormControl()
  });

  orderDetailForm: FormGroup = new FormGroup({
    orders: new FormControl(),
    fad: new FormControl(),
    quantity: new FormControl()
  });
  obj2: any;
  dateNow: string;
  qty: number = 1;
  orderFood: IFoodAndDrink;
  totalMonney: number;

  constructor(private categoryService: CategoryService, private foodAndDrinkService: FoodAndDrinkService,
              private cardService: CartService, private orderService: OrderService,
              private tableService: TableService, private cartService: CartService, private snackBar: SnackbarService, private dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.getAllCategory();
    this.getTable();
    this.getAllFood();
    this.getDate();

  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(data => {
      this.ListCategory = data;
    })
  }

  getAllFood() {
    this.foodAndDrinkService.getAllFoodAndDrink().subscribe(data => {
      this.FoodAndDrink = data;
      this.totalLength = data.length;
    })
  }

  getAllFoodTheoIdCategory(id: number) {
    this.foodAndDrinkService.getFoodAndDinkTheoCategory(id).subscribe(dataFood => {
      this.FoodAndDrink = dataFood;
      this.totalLength = dataFood.length;
      this.FoodAndDrink.forEach((a: any) => {
        Object.assign(a, {quantity: 1, total: a.fadPrice});
      })
    })
  }


  addToCart(product: any) {

    let check = false;
    let obj = [];
    for (let i in this.cartItemList) {
      if (this.cartItemList[i].fadId == product.fadId) {
        this.cartItemList[i].quantity++;
        this.qty = this.cartItemList[i].quantity;

        this.cartItemList[i].total += this.cartItemList[i].fadPrice;
        this.totalMonney = this.cartItemList[i].total;
        this.cartItemList[i].fadWaitTime += 180
        this.time = this.cartItemList[i].fadWaitTime;
        check = true;

        if (this.cartItemList[i].quantity > 20) {
          this.cartItemList[i].quantity = 20;

          this.cartItemList[i].total = this.cartItemList[i].fadPrice * 20;
          this.cartItemList[i].fadWaitTime = 3600;
        }

        break;
      }
    }

    if (!check) {
      this.cartItemList.push({
        fadId: product.fadId,
        fadName: product.fadName,
        quantity: 1,
        fadPrice: product.fadPrice,
        total: product.fadPrice,
        fadWaitTime: product.fadWaitTime * 60

      })
      for (let y in this.cartItemList) {
        this.time = this.cartItemList[y].fadWaitTime;
      }
      console.log(this.time);
      this.orderFood = this.cartItemList;
      // this.time = this.cartItemList.fadWaitTime;

      obj.push(this.cartItemList);

    }

    this.productList.next(this.cartItemList);
    this.product = this.cartItemList;
    console.log(product);

    obj = this.cartItemList;
    // console.log(obj);
    for (let bao in obj) {
      console.log(obj[bao]);
    }

    // console.log("bao");
    // console.log(obj);

    this.obj2 = obj;
    console.log(this.obj2);
  }

  truCart(product: any) {

    let check = false;

    for (let i in this.cartItemList) {
      if (this.cartItemList[i].fadId == product.fadId) {
        console.log(this.cartItemList[i].quantity);
        this.cartItemList[i].quantity--;
        this.qty = this.cartItemList[i].quantity;

        this.cartItemList[i].total -= this.cartItemList[i].fadPrice;
        this.totalMonney = this.cartItemList[i].total;
        this.cartItemList[i].fadWaitTime -= 180
        this.time = this.cartItemList[i].fadWaitTime;
        console.log(this.cartItemList[i].fadWaitTime);
        check = true;

        if (this.cartItemList[i].quantity < 1) {
          this.cartItemList[i].quantity = 1;

          this.cartItemList[i].total = this.cartItemList[i].fadPrice;
          this.cartItemList[i].fadWaitTime = 180;
        }
        break;
      }
    }
    console.log(this.time);
    this.productList.next(this.cartItemList);
    this.product = this.cartItemList;

  }


  // removeCart(product: any) {
  //   console.log(this.time);
  //   this.cartItemList.map((a: any, index: any) => {
  //     if (product.fadName === a.fadName) {
  //       if (this.time <= 0) {
  //         alert("Món của bn đã làm xong");
  //
  //       } else {
  //         this.cartItemList.splice(index, 1);
  //       }
  //     }
  //   })
  // }

  removeCartDialog(fadId: number, fadName: string, quantity: number, product: any) {
    let dialog = this.dialog.open(DeleteOrderComponent, {
      data: {
        id: fadId,
        name: fadName,
        quantity: quantity
      },
      width: '400px'
    })
    console.log(this.time);
    dialog.afterClosed().subscribe(data => {
      this.cartItemList.map((a: any, index: any) => {
        if (product.fadName === a.fadName) {
          if (this.time == 0) {
            this.snackBar.showSnackbar('Món của bn đã làm xong', 'error');
            console.log("true");
          } else {
            this.cartItemList.splice(index, 1);
            console.log(data);
          }
        }
      })
    })


  }


  getProduct() {
    return this.productList.asObservable();
  }

  getTable() {

    this.tableService.randomTableNull().subscribe(next => {
      this.table = next;
      console.log(this.table);
      this.createTableNewOrder();

    })
  }

  getDate() {
    let date = new Date()
    console.log(this.dateNow);
    this.dateNow = date.getDate() + "/" + "11" + "/" + date.getFullYear()
  }

  getCallEmp(table: ITables, id: number) {
    this.orderService.callEmp(table, id).subscribe(data => {
      console.log(data);
    });
    this.phucVu = 'Đang gọi phục vụ';

  }

  getCallFood(table: ITables, id: number) {
    this.orderService.callFood(table, id).subscribe(next => {
      console.log(next);
    })
    this.check = true;
    this.checkDelete = true;

  }

  getCallPay(table: ITables, id: number) {
    this.orderService.callPay(table, id).subscribe(next => {
      console.log(next);
    })
    this.thanhtoan = 'Đang chờ thanh toán';
  }

  createTableNewOrder() {
    this.orderForm.value.tables = this.table;
    let orderNew: IOrders | any = {
      tables: this.table
    }
    console.log(this.table);
    this.orderService.createNewOrder(orderNew).subscribe(data => {
      this.order = data;
      console.log(this.order);
    })
  }

  getOrder() {
    this.orderService.getOrder().subscribe(data => {
      this.orderList = data;
      console.log(data);
    })

  }

  newOrderDetail() {

    this.orderService.getOrder().subscribe(data => {
      this.orderList = data;
      this.orderDetailForm.value.orders = this.orderList;
      console.log(this.orderList.orderId);
      let numberOrderId = this.orderList.orderId;
      console.log(numberOrderId);

      this.orderService.findByIdOrderDetail(this.orderList.orderId).subscribe(data => {
        if (data != null) {
          this.orderService.deleteOrderDetailById(this.orderList.orderId).subscribe(next => {
            console.log(next);

            for (let i in this.obj2) {

              this.orderDetailForm.value.fad = this.obj2[i];
              this.orderDetailForm.value.quantity = this.obj2[i].quantity;

              this.orderService.createNewOrderDetail(this.orderDetailForm.value).subscribe(data => {

              })
            }
          })
        }
      })


      console.log(this.orderDetailForm.value);
      console.log("");

      for (let i in this.obj2) {

        this.orderDetailForm.value.fad = this.obj2[i];
        this.orderDetailForm.value.quantity = this.obj2[i].quantity;

        this.orderService.createNewOrderDetail(this.orderDetailForm.value).subscribe(data => {

        })
      }
    })
  }

}
