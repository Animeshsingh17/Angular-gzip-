import { Injector } from "@angular/core";
import { AuthenticationService } from "../services/auth.service";
import { ApiService } from '../services/apiService/apiservice.service';
import { SnackBarService } from '../services/snackBarService/snack-bar.service';

export abstract class AppComponentBase {
    authenticationService: AuthenticationService;
    apiService: ApiService;
    notificationService: SnackBarService;
    constructor(injector: Injector) {
        this.authenticationService = injector.get(AuthenticationService);
        this.apiService = injector.get(ApiService);
        this.notificationService = injector.get(SnackBarService);
    }

}