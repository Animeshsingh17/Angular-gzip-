import { Component, Injector, OnInit } from '@angular/core';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger80ms } from 'src/@vex/animations/stagger.animation';
import { AppConsts } from 'src/app/core/constant/appConsts';
import { AppComponentBase } from 'src/app/core/shared/AppComponentBase';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'theLunchCircle-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    stagger80ms,
    scaleIn400ms,
    fadeInRight400ms,
    fadeInUp400ms
  ],
})

export class NotificationsComponent extends AppComponentBase implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  icMoreVert = icMoreVert;
  constructor(injector: Injector) {
    super(injector)
   }
  target = 'LunchCircle';
  body: string;
  title: string;
  ngOnInit(): void {
    
  }
  sendNotification(){
    var notificationRequest = {
      target: this.target,
      body: this.body,
      title: this.title,
      userId: '',
      messageType: 'Invitation',
      email: '',
      message: ''
    }
    this.blockUI.start();
    this.apiService.post(environment.apiUrl + AppConsts.sendNotificationByTopic,notificationRequest).subscribe(async (result: any) => {
      this.blockUI.stop();
      this.notificationService.open('Notifications sent successfully', 'success', 1000);
    }, error => {
      this.blockUI.stop();
      return error;
    });
    this.body = '';
    this.title = '';
  }
}
