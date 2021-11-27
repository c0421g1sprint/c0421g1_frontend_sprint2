import {Component, OnInit} from '@angular/core';
import {ICategory} from "../../../entity/ICategory";
import {IFoodAndDrink} from "../../../entity/IFoodAndDrink";
import {CategoryService} from "../../../core-module/food_and_drink/category.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {FoodAndDrinkService} from "../../../core-module/food_and_drink/food-and-drink.service";
import {DialogDeleteComponent} from "../../../share-module/dialog-delete/dialog-delete.component";
import {FoodAndDrinkCreateComponent} from "../food-and-drink-create/food-and-drink-create.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-food-and-drink',
  templateUrl: './list-food-and-drink.component.html',
  styleUrls: ['./list-food-and-drink.component.css']
})
export class ListFoodAndDrinkComponent implements OnInit {
  fadList: IFoodAndDrink[];
  fad: IFoodAndDrink;
  categoryList: ICategory[];
  name: string = '';
  code: string = '';
  price: number | any = '';
  categoryId: number | any = '';
  oldName: string = '';
  oldCode: string = '';
  oldPrice: number | any = '';
  oldCategoryId: number | any = -1;
  pageObj: any = {page: 0, size: 5}
  responsePage: any; //tạo biến để nhận giá trị Observable
  totalPages: number = 0;
  totalElement: number = 0;

  constructor(
    private categoryService: CategoryService,
    private fadService: FoodAndDrinkService,
    private snackBar: SnackbarService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.viewAllFoodAndDrink(this.pageObj);
    console.log(this.pageObj.page)
  }

  //hien thi danh sach category
  getAllCategory() {
    this.categoryService.viewAllCategoryNoAgrument().subscribe(category => {
      console.log(category);
      this.categoryList = category;
      console.log(this.categoryList)
    })
  }

//hien thi danh sach fad - LinhDN
  viewAllFoodAndDrink(pageObj: any) {
    if ((this.code || this.name || this.pageObj || this.categoryId) != "") {
      if (!(this.code == this.oldCode && this.name == this.oldName && this.price == this.oldPrice && this.categoryId == this.oldCategoryId)) {
        this.pageObj.page = 0;
        console.log("acvv");
        this.oldName = this.name;
        this.oldCode = this.code;
        this.oldPrice = this.price;
        this.oldCategoryId = this.categoryId;
      }
    }
    let name = this.name.trim();
    let code = this.code.trim();
    this.fadService.viewAllFoodAndDrink(pageObj, code, name, this.price, this.categoryId).subscribe(data => {
      console.log(data);
      this.responsePage = data;
      console.log(this.responsePage);
      this.fadList = this.responsePage.content;
      this.totalPages = this.responsePage.totalPages;
      this.totalElement = this.responsePage.totalElement;
    }, error => {
      if (this.categoryId == 0) {
        this.fadService.viewAllFoodAndDrinkNoId(pageObj, code, name, this.price).subscribe(data => {
          this.responsePage = data;
          this.fadList = this.responsePage.content;
          this.totalPages = this.responsePage.totalPages;
          this.totalElement = this.responsePage.totalElement;
        }, error => {
          this.snackBar.showSnackbar("Không tìm thấy danh mục sản phẩm", "error");
        })
      } else {
        this.snackBar.showSnackbar("Không tìm thấy danh mục sản phẩm", "error");
      }
    })
  }

  openDialogCreate() {
    this.dialog.open(FoodAndDrinkCreateComponent, {panelClass: 'my-bg'})
  }

//lay code tu form - LinhDN
  getCode($event: any) {
    this.code = $event.target.value
  }

//lay name tu form - LinhDN
  getName($event: any) {
    this.name = $event.target.value;
  }

//lay gia tu form
  getPrice($event: any) {
    this.price = $event.target.value;
  }


  //xoa fad - LinhDN
  openDialogDelete(fadName: string, fadId: number) {
    let dialog = this.dialog.open(DialogDeleteComponent, {
      data: {
        id: fadId,
        name: fadName,
        object: "món"
      }
    });
    dialog.afterClosed().subscribe(nextClose => {
      if (nextClose == `yes`) {
        this.fadService.delete(fadId, this.fad).subscribe(data => {
          console.log(data);
          this.snackBar.showSnackbar("Xoá sản phẩm " + name + " thành công", "success");
          this.ngOnInit();
        })
      }
    })
  }

  //previous trang - LinhDN
  previousPage() {
    this.pageObj.page--;
    if (this.pageObj.page <= 0) {
      this.pageObj.page = 0;
    }
    console.log(this.pageObj)
    this.viewAllFoodAndDrink(this.pageObj)
  }

  //next trang - LinhDN
  nextPage() {
    this.pageObj.page = ++this.pageObj.page;
    if (this.pageObj.page > this.responsePage.totalPages - 1) {
      this.pageObj.page = this.responsePage.totalPages - 1;
    }
    console.log(this.pageObj)
    this.viewAllFoodAndDrink(this.pageObj)
  }

  //nhap so trang trang - LinhDN
  getPage(value: string) {
    if (value == null) {
      this.snackBar.showSnackbar("Vui lòng nhập số trang cần tìm", 'error');
    }
    if (Number(value) <= this.responsePage.totalPages && Number(value) > 0 && Number(value) % 1 == 0) {
      this.pageObj['page'] = Number(value) - 1
      console.log(this.pageObj['page'])
      this.viewAllFoodAndDrink(this.pageObj);
    } else {
      this.snackBar.showSnackbar("Trang cần tìm không hợp lệ", 'error');
    }
  }


  getCategory($event: any) {
    this.categoryId = $event.target.value;
  }

  //LamNT update
  updateFad(fadId: number) {
    this.router.navigateByUrl('/food-and-drink/update/' + fadId);
  }
}
