import { Component, OnInit } from '@angular/core';
import {FeedbackService} from "../../../core-module/feedback/feedback.service";
import {MatDialog} from "@angular/material/dialog";
import {IFeedback} from "../../../entity/IFeedback";
import {DialogDetailComponent} from "../dialog-detail/dialog-detail.component";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css'],
  providers: [DatePipe]
})
export class ListFeedbackComponent implements OnInit {
  feedBackList : IFeedback[];
  currentPage : number = 0;
  messError = '';
  inputDate = null;
  totalPages :number = 0;
  myDate: any = new Date();

  constructor(private feedbackService : FeedbackService,
              private matDialog : MatDialog,
              private snackBar : SnackbarService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.findAllFeedBackList();
  }
  // method get list
  findAllFeedBackList(){
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.feedbackService.findAllFeedBack(this.inputDate,this.currentPage).subscribe(next =>{
      console.log(next.totalPages)
      this.totalPages = next.totalPages;
      this.feedBackList = next.content;
      console.log(this.feedBackList)
    }, error => {
      if (error.status == '404'){
        this.messError = 'Hiện tại không có phản hồi của khách hàng'
      }
    })
  }
  // lui trang
  previousPage() {
    console.log(this.currentPage);
    if (this.currentPage > 0) {
      this.currentPage--;
      this.ngOnInit();
    }
  }
  // sang trang
  nextPage() {
    console.log(this.currentPage);
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.ngOnInit();
    }
  }
  // search list by date
  searchByDate(value: string) {
      this.inputDate = value;
      if (this.inputDate == ""){
        this.inputDate = null
      }
      console.log(this.inputDate)
      this.feedbackService.findAllFeedBack(this.inputDate,this.currentPage).subscribe(next =>{
        this.feedBackList = next.content;
        console.log(this.feedBackList)
      }, error => {
        if (error.status == '404'){
          this.feedBackList = [];
        }
      })
  }
  // open dialog
  openDialog(id: number) {
    let dialogRef = this.matDialog.open(DialogDetailComponent, {data : id,
      minHeight : "60%",
      width : "35%",
      panelClass : 'custom-dialog-container'
    })
  }
  // nhay trang
  jumpingPage(value: string) {
    let numberValue = +value;
    if (numberValue > 0 && numberValue <= this.totalPages){
      this.currentPage = numberValue-1;
      this.ngOnInit();
    }
  }
}
