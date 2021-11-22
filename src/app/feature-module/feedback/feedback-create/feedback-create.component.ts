import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FeedbackService} from "../../../core-module/feedback/feedback.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {IFeedback} from "../../../entity/IFeedback";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css']
})
export class FeedbackCreateComponent implements OnInit {

    selectedFile: File = null;
  image;
  downloadURL: Observable<string>;
  imgSrc: string = '/assets/anh/anh.macdinh.jpg';
  selectedImage: any = null;
  feedbackCode: String = '';
  feedbackForm: FormGroup = new FormGroup({
    feedbackCode: new FormControl('',[Validators.pattern('^FEB-\\d{4}$')]),
    feedbackDate: new FormControl('',[Validators.required]),
    feedbackCreator: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    feedbackEmail: new FormControl('', [Validators.required, Validators.email]),
    feedbackContent: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]),
    feedbackImage: new FormControl('')
  });

  constructor(private feedbackService: FeedbackService, private router: Router, private storage: AngularFireStorage, private snackBar: SnackbarService) {
  }

  ngOnInit(): void {
    this.feedbackForm.reset();
  }

  saveFeedback(): void {
    let feedbacks: IFeedback | any = {
      feedbackCode: this.feedbackForm.get('feedbackCode').value,
      feedbackDate: this.feedbackForm.get('feedbackDate').value,
      feedbackCreator: this.feedbackForm.get('feedbackCreator').value,
      feedbackEmail: this.feedbackForm.get('feedbackEmail').value,
      feedbackContent: this.feedbackForm.get('feedbackContent').value,
      feedbackImage: this.image
    };
    this.feedbackService.saveFeedback(feedbacks).subscribe(data => {
      console.log(data);
      console.log(this.feedbackForm.value);
      this.snackBar.showSnackbar('Phản hồi của bạn đã được gửi', 'success');
      this.router.navigateByUrl("/feed-back-list");
    }, error => {
      this.snackBar.showSnackbar('Thêm mới thất bại', 'error');
    });
  }

  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.image = url;
            }
            console.log(this.image);
            this.feedbackForm.value.feedbackImage = this.image;
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  // showPreview(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => this.imgSrc = e.target.result;
  //     reader.readAsDataURL(event.target.files[0]);
  //     this.selectedImage = event.target.files[0];
  //   } else {
  //     this.imgSrc = '';
  //     this.selectedImage = null;
  //   }
  // }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/anh/anh.macdinh.jpg';
      this.selectedImage = null;
    }
  }
  validationMessage = {
    feedbackDate: [
      {type: 'required', message: 'Ngày tạo không được để trống.'},

    ],
    feedbackCode:[
      {type: 'required', message:' Mã Code không được để trống'},
      {type: 'pattern', message:' Mã Code có dạng: FEB-XXXX. X chạy từ 0 đến 9'}
    ],
    feedbackImage: [
      {type: 'required', message: 'Ảnh không được để trống.'}
    ]
  }



}
