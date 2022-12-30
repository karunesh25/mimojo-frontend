import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {Router} from '@angular/router';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    name: null,
    mobile: null,
    address : null,
    country: null,
    city : null,
    postalcode: null,
    //subscription: null,
    cardnumber:null,
    cardname:null,
    cardexpiry:null,
    cvv:null,
    

  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  countries: any[] = [];
  packages: any[] = [];
  selectedcountry = ''
  currency = '';
  amount = 0;
  cardbin = '';
  cardlast4 = '';
  subscription = '';
	onSelected(value:string): void {
		this.subscription = value;
    
	}
  onCountrySelected(value:string): void {
		this.selectedcountry = value;
    
	}

  constructor(private authService: AuthService,private toastr: ToastrService, private route: Router, private userService: UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.route.navigate(['dashboard']);
    }
    this.getCountries();
    this.getPackages();
  }
  onPackageSelect(item:any) {
    console.log(item);
    this.currency = item["attributes"]["Currency"];
    this.amount = item["attributes"]["Amount"];
    this.subscription = item["attributes"]["Name"];
    // if(event.srcElement.classList.value == "w-100 btn btn-lg btn-outline-primary"){
    //   event.srcElement.classList.value = "w-100 btn btn-lg btn-primary";
    // }else{
    //   event.srcElement.classList.value = "w-100 btn btn-lg btn-outline-primary"
    // }
  }
  getPackages() {
    this.userService.getPackages().subscribe({
      next: this.getPackageInfo.bind(this),
      error: this.handleError.bind(this)
    });
  }
  getPackageInfo(response: any): void {
    console.log(response.data);
    this.packages = response.data;
  };

  getCountries() {
    this.userService.getCountries().subscribe({
      next: this.getCountriesInfo.bind(this),
      error: this.handleError.bind(this)
    });
  }
  getCountriesInfo(response: any): void {
    this.countries = response;
  };
  handleError(error: any): void {
    console.log(error);
    //this.commonService.showNotification('top', 'center', "Something went wrong. Please try again.", UserMessageType.Danger);
  }
  showMessage(response: any): void {
    this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span> Thanks for Sign up. Please login to continue!', '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-info alert-with-icon",
      positionClass: 'toast-' + 'top' + '-' +  'left'
    });
  };
  onSubmit(): void {
    const { username, email, password, name, mobile, address, city, 
      postalcode ,  cardnumber, cardname, cardexpiry, cvv} = this.form;
    this.authService.register(username, email, password, name, mobile, address, this.selectedcountry, city, postalcode , 
      this.subscription, cardname, cardexpiry, cvv,this.currency,this.amount, cardnumber.substring(0,6) , cardnumber.substring(cardnumber.length - 4)).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showMessage(this);
        this.route.navigate(['login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}