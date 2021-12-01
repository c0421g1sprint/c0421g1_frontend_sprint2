import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../../core-module/account/storage.service";
import {LinkService} from "../../core-module/account/link.service";
import {MatDialog} from "@angular/material/dialog";
import {UserDetailComponent} from "../../feature-module/account/user-detail/user-detail.component";
import {IEmployee} from "../../entity/IEmployee";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  role: string[] = [];

  constructor(private router: Router,
              private storage: StorageService,
              private linkService: LinkService,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    if (this.storage.getToken()) {
      this.username = this.storage.getUsernameFromSession();
      this.role = this.storage.getRole();
      console.log(this.role)
    } else {
      this.username = '';
      this.role = [];
    }
    this.linkService.getReloadComponent().subscribe(() => {
      if (this.storage.getToken()) {
        this.username = this.storage.getUsernameFromSession();
        this.role = this.storage.getRole();

      } else {
        this.username = '';
        this.role = [];
      }
    })
  }

  getOut() {
    window.sessionStorage.clear();
    this.username = '';
    this.role = [];
    this.router.navigateByUrl("/login");
  }

  showInfoUser(user: string) {
    this.dialog.open(UserDetailComponent, {panelClass: 'custom-dialog-container',
      data: user,
      width: '400px'
    })
  }
}
