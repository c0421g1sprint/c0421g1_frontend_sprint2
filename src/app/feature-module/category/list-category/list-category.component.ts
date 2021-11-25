import {Component, OnInit} from '@angular/core';
import {ICategory} from "../../../entity/ICategory";
import {CategoryService} from "../../../core-module/food_and_drink/category.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeleteComponent} from "../../../share-module/dialog-delete/dialog-delete.component";
import {CategoryCreateComponent} from "../category-create/category-create.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categoryList: ICategory[];
  category: ICategory;
  name: string = '';
  code: string = '';
  oldName: string = '';
  oldCode: string = '';
  pageObj: any = {page: 0, size: 5};
  responsePage: any; //tạo biến để nhận giá trị Observable
  totalPages: number = 0;
  totalElement: number = 0;

  constructor(private categoryService: CategoryService,
              private snackBar: SnackbarService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.viewAllCategory(this.pageObj);
    console.log(this.pageObj)
  }

  //hien thi danh sach category - LinhDN
  viewAllCategory(pageObj: any) {
    if ((this.code || this.name) != "") {
      if (!(this.code == this.oldCode && this.name == this.oldName)) {
        this.pageObj.page = 0;
        this.oldName = this.name;
        this.oldCode = this.code;
      }
    }
    let name = this.name.trim();
    let code = this.code.trim();
    this.categoryService.viewAllCategory(pageObj, code, name).subscribe(data => {
      console.log(data);
      this.responsePage = data;
      this.categoryList = this.responsePage.content;
      this.totalPages = this.responsePage.totalPages;
      this.totalElement = this.responsePage.totalElement;
    }, error => {
      this.snackBar.showSnackbar("Không tìm thấy danh mục sản phẩm", "error");
    })
  }

  openDialogCreate() {
    this.dialog.open(CategoryCreateComponent, {panelClass: 'my-bg'});
  }

//lay code tu form - LinhDN
  getCode($event: any) {
    this.code = $event.target.value
  }

//lay name tu form - LinhDN
  getName($event: any) {
    this.name = $event.target.value;
  }

  //xoa categogy - LinhDN
  openDialogDelete(categoryName: string, categoryId: number) {
    let dialog = this.dialog.open(DialogDeleteComponent, {
      data: {
        id: categoryId,
        name: categoryName,
        object: "nhóm món"
      }
    });
    dialog.afterClosed().subscribe(nextClose => {
      if (nextClose == `true`) {
        this.categoryService.delete(categoryId, this.category).subscribe(data => {
          console.log(data);
          this.snackBar.showSnackbar("Xoá nhóm món " + name + " thành công", "success");
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
    console.log(this.pageObj);
    this.viewAllCategory(this.pageObj)
  }

  //next trang - LinhDN
  nextPage() {
    console.log(this.totalPages)
    this.pageObj.page++;
    if (this.pageObj.page > this.responsePage.totalPages - 1) {
      this.pageObj.page = this.responsePage.totalPages - 1;
    }
    console.log(this.pageObj)
    this.viewAllCategory(this.pageObj)
  }

  //nhap so trang trang - LinhDN
  getPage(value: string) {
    if (value == null) {
      this.snackBar.showSnackbar("Vui lòng nhập số trang cần tìm", 'error');
    }
    if (Number(value) <= this.responsePage.totalPages && Number(value) > 0 && Number(value) % 1 == 0) {
      this.pageObj['page'] = Number(value) - 1
      console.log(this.pageObj['page'])
      this.viewAllCategory(this.pageObj);
    } else {
      this.snackBar.showSnackbar("Trang cần tìm không hợp lệ", 'error');
    }
  }

  //LamNT
  updateCategory(categoryId: number) {
    this.router.navigateByUrl('category/update/' + categoryId);
  }
}
