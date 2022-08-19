import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogined = false;
  isVisibleModal = false;
  isVisibleMenu = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedInStore().subscribe(value => {
      this.isLogined = value;
    })
  }

  openMenu() {
    this.isVisibleMenu = true;
  }

  closeMenu() {
    this.isVisibleMenu = false;
  }

  showModal() {
    this.isVisibleModal = !this.isVisibleModal;
    this.closeMenu();
  }

  handleCancel(): void {
    this.isVisibleModal = false;
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.authService.redirectLogin();
  }

}
