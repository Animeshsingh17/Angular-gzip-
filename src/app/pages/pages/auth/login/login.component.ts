import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { finalize, first } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { environment } from 'src/environments/environment';
import { AppConsts } from 'src/app/core/constant/appConsts';
@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  @BlockUI() blockUI: NgBlockUI;
  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
    , injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  send() {
    this.blockUI.start();
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .subscribe(
        async (result) => {
          if (result.success && result.data.roles.includes("ROLE_ADMIN")) {
            this.blockUI.stop();
            this.router.navigate(['/dashboard']);
          }
          else{
            this.notificationService.open('You are not allowed to login', 'error', 1000)
            this.blockUI.stop();
          }
        },
        error => {
          this.blockUI.stop();
          this.notificationService.open(error, 'error', 1000);
        });
  }
  get f() { return this.form.controls; }
  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
