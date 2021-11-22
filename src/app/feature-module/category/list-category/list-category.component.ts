import { Component, OnInit } from '@angular/core';
import {ICategory} from "../../../entity/ICategory";
import {CategoryService} from "../../../core-module/food_and_drink/category.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogDeleteComponent} from "../../../share-module/dialog-delete/dialog-delete.component";

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
  pageObj: any = {page: 0, size: 5}
  responsePage: any; //tạo biến để nhận giá trị Observable
  totalPages: number = 0;
  totalElement: number = 0;

  constructor(private categoryService: CategoryService,
              private snackBar: SnackbarService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.viewAllCategory(this.pageObj);
  }

  //hien thi danh sach category
  viewAllCategory(pageObj: any){
    if ((this.code||this.name)!=""){
      this.pageObj.page = 0;
      if ((this.code==this.oldCode&&this.name==this.oldName)){
        this.pageObj.page = 0;
        this.oldName = this.name;
        this.oldCode = this.code;
      }
    }
    let name = this.name.trim();
    let code = this.code.trim();
    this.categoryService.viewAllCategory(pageObj,code,name).subscribe(data =>{
      console.log(data);
      this.responsePage = data;
      console.log(this.responsePage);
      this.categoryList = this.responsePage.content;
      this.totalPages = this.responsePage.totalPages;
      this.totalElement = this.responsePage.totalElement;
    },error => {
      this.snackBar.showSnackbar("Không tìm thấy danh mục sản phẩm","error");
    })
  }

  openDialogCreate() {

  }


  getCode($event: any) {
    this.code = $event.target.value
  }

  getName($event: any) {
    this.name = $event.target.value;
  }

  openDialogDelete(categoryName: string, categoryId: number) {
    let dialog =this.dialog.open(DialogDeleteComponent, {
      data: {
        id: categoryId,
        name: categoryName,
        object: "nhóm món"
      }
    })
  dialog.afterClosed().subscribe(nextClose=>{
    if (nextClose == `true`) {
      this.categoryService.delete(categoryId, this.category).subscribe(data => {
        console.log(data);
        this.snackBar.showSnackbar("Xoá nhóm món " + name + " thành công", "success");
        this.ngOnInit();
      })
    }
  })
  }

  previousPage() {
    this.pageObj.page--;
    if (this.pageObj.page<=0){
      this.pageObj.page = 0;
    }
    console.log(this.pageObj)
    this.viewAllCategory(this.pageObj)
  }

  nextPage() {
    console.log(this.totalPages)
    this.pageObj.page++;
    if (this.pageObj.page>=this.responsePage.totalPages-1){
      this.pageObj.page = this.responsePage.totalPages-1 ;
    }
    console.log(this.pageObj)
    this.viewAllCategory(this.pageObj)
  }

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
}
