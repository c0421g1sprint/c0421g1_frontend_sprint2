import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../core-module/food_and_drink/category.service";
import {ICategory} from "../../../entity/ICategory";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  categoryList: ICategory[];
  category: ICategory;
  name: string = '';
  code: string = '';
  oldName: string = '';
  oldCode: string = '';
  pageObj: any = {page: 0, size: 10}
  responsePage: any; //tạo biến để nhận giá trị Observable
  totalPages: number = 0;
  totalElement: number = 0;

  constructor(private categoryService: CategoryService,
              private snackBar: SnackbarService) { }

  ngOnInit(): void {
  }

  //hien thi danh sach category
  viewAllCategory(pageObj: any){
    if ((this.code||this.name)!=""){
      if ((this.code==this.oldCode&&this.name==this.oldName)){
        this.pageObj.page = 0;
        this.oldName = this.name;
        this.oldCode = this.code;
      }
    }
    let name = this.name.trim();
    this.categoryService.viewAllCategory(pageObj,this.code,name).subscribe(data =>{
      this.responsePage = data;
      this.categoryList = this.responsePage.content;
      this.totalPages = this.responsePage.totalPages;
      this.totalElement = this.responsePage.totalElement;
    },error => {
      this.snackBar.showSnackbar("Không tìm thấy danh mục sản phẩm","error");
    })
  }

}
