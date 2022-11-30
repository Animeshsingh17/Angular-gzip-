import { Component, Inject,LOCALE_ID, Renderer2 } from '@angular/core';
import { ConfigService } from '../@vex/services/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import icLayers from '@iconify/icons-ic/twotone-layers';
import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { Style, StyleService } from '../@vex/services/style.service';
import { ConfigName } from '../@vex/interfaces/config-name.model';
import twotoneSupervisorAccount from '@iconify/icons-ic/twotone-supervisor-account';
import roundFileCopy from '@iconify/icons-ic/round-file-copy';
import roundNotificationAdd from '@iconify/icons-ic/round-notifications-active';
import baselineSettings from '@iconify/icons-ic/baseline-settings';
import twotoneGroups from '@iconify/icons-ic/twotone-groups';
import baselineSportsHandball from '@iconify/icons-ic/baseline-sports-handball';
import baselineHowToReg from '@iconify/icons-ic/baseline-how-to-reg';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'The lunch Circle';

  constructor(private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl'))),
    ).subscribe(isRtl => {
      this.document.body.dir = isRtl ? 'rtl' : 'ltr';
      this.configService.updateConfig({
        rtl: isRtl
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));


    /**
     * Add your own routes here
     */
    this.navigationService.items = [
      {
        type: 'link',
        label: 'Dashboard',
        route: '/',
        icon: icLayers,
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',
        label: 'User',
        route: '/user',
        icon: twotoneSupervisorAccount
      },
      {
        type: 'link',
        label: 'Recommended for Lunch Circle',
        route: '/recommendeduser',
        icon: baselineHowToReg
      },
      {
        type: 'link',
        label: 'User Interest',
        route: '/userInterest',
        icon: baselineSportsHandball
      }
      ,{
        type: 'link',
        label: 'Temp Registration',
        route: '/userRegistration',
        icon: twotoneSupervisorAccount
      },
      {
        type: 'link',
        label: 'Circles',
        route: '/circle',
        icon: twotoneGroups
      },
      {
        type: 'dropdown',
        label: 'Properties',
        icon: baselineSettings,
        children: [
          {
          type: 'link',
          label: 'Application Properties',
          route: '/properties/application',
          },
          {
            type: 'link',
            label: 'Message Properties',
            route: '/properties/message',
            },
        ]
      },
      {
        type: 'dropdown',
        label: 'Notifications',
        icon: roundNotificationAdd,
        children: [
          {
          type: 'link',
          label: 'Admin notifications',
          route: '/notifications/adminNotifications',
          },
          {
            type: 'link',
            label: 'User notifications',
            route: '/notifications/userNotifications',
            },
        ]
      },
      {
        type: 'dropdown',
        label: 'Report',
        icon: roundFileCopy,
        children: [{
          type: 'link',
          label: 'User activity',
          route: '/reports/activity',
        },
        {
          type: 'link',
          label: 'User last activity',
          route: '/reports/lastActivity',
        },
        {
          type: 'link',
          label: 'User location interaction',
          route: '/reports/userInteractionWithCurrentLocation'
        },
        {
          type: 'link',
          label: 'Pending user connections',
          route: '/reports/pendingList',
        },
        
        {
          type: 'link',
          label: 'User invited but not signup',
          route: '/reports/invitationNotSignup',
        },
        {
          type: 'link',
          label: 'User signup but not login',
          route: '/reports/userSignupNotLogin',
        }
        ]
      }
     
    ];
  }
}
