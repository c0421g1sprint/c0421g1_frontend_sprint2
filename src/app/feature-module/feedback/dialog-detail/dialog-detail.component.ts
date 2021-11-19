import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FeedbackService} from "../../../core-module/feedback/feedback.service";
import {IFeedback} from "../../../entity/IFeedback";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetailComponent implements OnInit {
  feedback : IFeedback
  errorMessage : String = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data : number,
              private feedbackService : FeedbackService ) { }

  ngOnInit(): void {
    this.getIFeedBack()
  }

  getIFeedBack (){
    this.feedbackService.findFeedBackById(this.data).subscribe(next =>{
      console.log(next);
      this.feedback = next;
    }, error => {
      if (error.status == "404"){
        this.errorMessage = "Xem chi tiết đang lỗi, hiện tại không xem được"
      }
    })
  }

}
