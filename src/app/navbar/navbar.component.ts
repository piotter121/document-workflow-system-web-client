import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from '../auth/user-info';
import { UserService } from '../auth/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  activatedRoute: ActivatedRoute;

  loggedIn$: Observable<UserInfo>;
  isCollapsed = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loggedIn$ = this.userService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute
    });
  }

}
