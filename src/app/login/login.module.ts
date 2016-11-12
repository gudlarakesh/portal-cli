import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';


@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [LoginComponent, SignupComponent],
    exports: [LoginComponent, SignupComponent, RouterModule]
})

export class LoginModule { }
