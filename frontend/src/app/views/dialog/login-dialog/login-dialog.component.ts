import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
    public email = new FormControl('', [Validators.required, Validators.email]);

    constructor(private dialog: MatDialog, private userService: UserService) {}

    ngOnInit(): void {}

    public async login(): Promise<void> {
        if (this.email.valid) {
            const user = await this.userService.login(this.email.value);

            if (user) {
                this.dialog.closeAll();
            }
        }
    }

    public getErrorMessage(): string {
        if (this.email.hasError('required')) {
            return 'You must enter a value';
        }

        return this.email.hasError('email') ? 'Not a valid email' : '';
    }
}
