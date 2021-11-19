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

  orderForm: FormGroup = new FormGroup({
    tables: new FormControl()
  });

  orderDetailForm: FormGroup = new FormGroup({
    orderId: new FormControl(),
    fadId: new FormControl(),
    quantity: new FormControl()
  });

  qty: number;
  orderFood: IFoodAndDrink;


  constructor(private categoryService: CategoryService, private foodAndDrinkService: FoodAndDrinkService, private cardService: CartService, private orderService: OrderService, private tableService: TableService, private cartService: CartService) {
  }


  ngOnInit(): void {
    this.getAllCategory();
    this.getTable();
    this.getAllFood();

  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(data => {
      this.ListCategory = data;
      console.log(data)
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

    for (let i in this.cartItemList) {
      if (this.cartItemList[i].fadId == product.fadId) {
        this.cartItemList[i].quantity++;
        this.qty = this.cartItemList[i].quantity;
        console.log(this.qty);
        this.cartItemList[i].total += this.cartItemList[i].fadPrice;
        this.cartItemList[i].fadWaitTime += 180
        check = true;
        if (this.cartItemList[i].quantity > 20) {
          alert("dmmmmmmmmmmmmmmmmmmmmmmm ");
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
      this.orderFood = this.cartItemList;

    }
    this.productList.next(this.cartItemList);
    this.product = this.cartItemList;

  }

  truCart(product: any) {
    let check = false;

    for (let i in this.cartItemList) {
      if (this.cartItemList[i].fadId == product.fadId) {
        this.cartItemList[i].quantity--;
        this.cartItemList[i].total -= this.cartItemList[i].fadPrice;
        this.cartItemList[i].fadWaitTime -= 180
        check = true;
        if (this.cartItemList[i].quantity < 0) {
          alert("dmmmmmmmmmmmmmmmmmmmmmmm");
        }
        break;
      }
    }
    if (!check) {
      // this.cartItemList.push(product);
      // console.log(product.fadId);
      // this.quantity = 1;
      this.cartItemList.push({
        fadId: product.fadId,
        fadName: product.fadName,
        quantity: 1,
        fadPrice: product.fadPrice,
        total: product.fadPrice,
        fadWaitTime: product.fadWaitTime * 60
      })
    }
    this.productList.next(this.cartItemList);
    this.product = this.cartItemList;
  }


  removeCart(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.fadName === a.fadName) {
        this.cartItemList.splice(index, 1);
      }
    })
  }

  getProduct() {
    return this.productList.asObservable();
  }

  getTable() {
    this.tableService.randomTableNull().subscribe(next => {
      this.table = next;
      this.createTableNewOrder();
      console.log(this.orderFood);
      this.getOrder();

    })
  }

  getCallEmp(table: ITables, id: number) {
    this.orderService.callEmp(table, id).subscribe(data => {
      console.log(data);
    });
  }

  getCallFood(table: ITables, id: number) {
    this.orderService.callFood(table, id).subscribe(next => {
      console.log(next);
    })
  }

  getCallPay(table: ITables, id: number) {
    this.orderService.callPay(table, id).subscribe(next => {
      console.log(next);
    })
  }

  createTableNewOrder() {
    this.orderForm.value.tables = this.table;
    let orderNew: IOrders | any = {
      tables: this.table
    }
    console.log(this.table);
    this.orderService.createNewOrder(orderNew).subscribe(data => {
      this.order = data;
      console.log(data);
    })
  }

  getOrder() {
    this.orderService.getOrder().subscribe(data => {
      this.orderList = data;
      console.log(data);
    })

  }

  newOrderDetail() {
    this.orderDetailForm.value.orderId = 40;
    this.orderDetailForm.value.fadId = this.orderFood.fadId;
    this.orderDetailForm.value.qty = this.qty;
    this.orderService.createNewOrderDetail(this.orderDetailForm.value).subscribe(data => {
      console.log(data);
    })
    console.log(this.orderFood)

  }
}
