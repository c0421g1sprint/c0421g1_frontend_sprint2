import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FoodAndDrinkService} from "./food-and-drink.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public product:any;


  constructor(private foodService:FoodAndDrinkService) {
  }

  getProduct() {
    return this.productList.asObservable();

  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();

    this.product = this.cartItemList;
    // console.log(product);
    console.log(this.cartItemList);
  }

  getTotalPrice() :number{
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;

  }

  removeCart(product: any) {
    this.cartItemList.map((a: any, index:any)=>{
      if (product.id === a.id){
        this.cartItemList.splice(index,1);
      }
    });
  }
}
