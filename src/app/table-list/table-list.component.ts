import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  public paymentHistory: any[] = [];

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private route: Router) { }

  ngOnInit() {

    if (this.tokenStorage.getToken()) {
      this.getuserprofile(this.tokenStorage.getUser());
    }else{
      this.route.navigate(['login']);
    }
  }

  getuserprofile(userid: string) {
    this.userService.getProfile(userid).subscribe({
      next: this.returnUserInfo.bind(this),
      error: this.handleError.bind(this)
    });
  }
  returnUserInfo(response: any): void {
    this.paymentHistory.push(response);
    console.log(this.paymentHistory);
  };
  handleError(error: any): void {
    console.log(error);
    //this.commonService.showNotification('top', 'center', "Something went wrong. Please try again.", UserMessageType.Danger);
  }

}
