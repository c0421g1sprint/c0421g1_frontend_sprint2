import {Component, OnInit} from '@angular/core';
import {CartService} from "../../core-module/food_and_drink/cart.service";
import {IFoodAndDrink} from "../../entity/IFoodAndDrink";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products:any=[];
  public grandTotal!:number;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.getProduct().subscribe(res => {
      this.products = res;
      console.log(res);
      this.grandTotal = this.cartService.getTotalPrice();
      console.log(this.products);
    })
  }


}
