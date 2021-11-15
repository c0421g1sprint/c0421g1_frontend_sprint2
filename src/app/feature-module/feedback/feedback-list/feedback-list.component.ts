import { Component, OnInit } from '@angular/core';
import {IFeedback} from "../../../entity/IFeedback";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {FeedbackService} from "../../../core-module/feedback/feedback.service";

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {

  constructor(private feedbackService: FeedbackService,
              private route: Router,
              private snackBar: SnackbarService,
              private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient) { }


  feedbacks: IFeedback[];
  feedbackFather: IFeedback;

  ngOnInit(): void {
    this.httpClient.get('http://localhost:8080/api/feed-back').subscribe((result: IFeedback[]) => {
      this.feedbacks = result;
      console.log(this.feedbacks);
    })
  }

}
