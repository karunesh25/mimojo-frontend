import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public username;
  public email;
  public name;
  public mobile;
  public address;
  public country;
  public city;
  public subscription;
  public purchasedate;
  public expirydate;
  public cardnumber;
  public cardholdername;
  public cardexpiry;
  public addcountry;
  public countries: any[] = [];

  constructor(private userService: UserService, private toastr: ToastrService, private tokenStorage: TokenStorageService, private route: Router) { } 
	onSelected(value:string): void {
		this.addcountry = value;
    
	}
  onUserCountrySave(): void {
    console.log(this.addcountry);
		  this.userService.addUserCountry(this.tokenStorage.getUser(), this.addcountry).subscribe({
      next: this.showMessage.bind(this),
      error: this.handleError.bind(this)
    });

	}
  showMessage(response: any): void {
    this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span> Country added.. please check dashboard!', '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-info alert-with-icon",
      positionClass: 'toast-' + 'top' + '-' +  'left'
    });
  };
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.getuserprofile(this.tokenStorage.getUser());
      this.getCountries();
    }else{
      this.route.navigate(['login']);
    }

  }
 
  getCountries() {
    this.userService.getCountries().subscribe({
      next: this.getCountriesInfo.bind(this),
      error: this.handleError.bind(this)
    });
  }
  getCountriesInfo(response: any): void {
    this.countries = response;
  };

  getuserprofile(userid: string) {
    this.userService.getProfile(userid).subscribe({
      next: this.returnUserInfo.bind(this),
      error: this.handleError.bind(this)
    });
  }
  returnUserInfo(response: any): void {
    console.log(response);
    this.username = response.registration.userId;
    this.email = response.registration.emailId;
    this.name = response.registration.name;
    this.mobile = response.registration.mobile;
    this.country = response.registration.country;
    this.city = response.registration.city;
    this.address = response.registration.address;
    this.subscription = response.subscription.subscription;
    this.purchasedate = response.subscription.purchaseDate;
    this.expirydate = response.subscription.expiryDate;
    this.cardnumber = '**********' + response.payment.cardLast4;
    this.cardexpiry = response.payment.expiry;
    this.cardholdername = response.payment.cardName;
  };
  handleError(error: any): void {
    console.log(error);
    //this.commonService.showNotification('top', 'center', "Something went wrong. Please try again.", UserMessageType.Danger);
  }

}
