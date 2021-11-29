import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoginService} from "../../../core-module/account/login.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  loading = false;
  @ViewChild('email') emailHtmlElement: ElementRef;
  constructor(private loginService: LoginService, private snackbar: SnackbarService, private route: Router) { }

  ngOnInit(): void {
  }

  sendEmail(items) {
    console.log(items);
    this.loading = true;
    this.loginService.getPassword(items).subscribe(
      next => {
        this.loading = false;
        this.route.navigateByUrl("/login");
        this.snackbar.showSnackbar("Mật khẩu đã được gửi về email cho bạn", "success");
      }, error => {
        this.loading = false;
        this.emailHtmlElement.nativeElement.focus();
        this.snackbar.showSnackbar("Không tìm thấy email này", "error");
      }
    )
  }
}
