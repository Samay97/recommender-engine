import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../dialog/login-dialog/login-dialog.component';
import { Customer } from 'src/app/core/dto/customer';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public customer: Observable<Customer | null>;

    constructor(private userService: UserService, private dialog: MatDialog, private router: Router) {}

    ngOnInit(): void {
        this.customer = this.userService.userIsLoggedIn.asObservable();
        this.userService.userIsLoggedIn.subscribe((data) => {
            console.log(data);
        });
    }

    public openDialog() {
        this.dialog.open(LoginDialogComponent, { width: '50%' });
    }

    public openCard() {
        this.router.navigate(['/card']);
    }
}
