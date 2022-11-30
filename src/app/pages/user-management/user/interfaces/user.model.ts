import { Helper } from "src/app/core/helpers/helper";

export class User {
  userId: string;
  userEmail:string;
  email: string;
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  qualifications?: string;
  companyName?: string;
  jobTitle?: string;
  dateOfBirth?: any;
  homeLocation?: string;
  headLine?: string;
  fullBio?: string;
  countryCode?: string;
  mobileNumber?: string;
  roles?: any;
  interests?: any[];
  userStatus?: string;
  numberOfConnection?: number;
  userPhotoUrl?: string;
  dynamicLink?: any;
  gender?: any;
  newUser?: boolean;
  
  constructor(user) {
    this.userId = user.userId;
    this.email=user.email;
    this.userEmail=user.email;
    this.title= user.title;
    this.firstName= user.firstName;
    this.middleName= user.middleName;
    this.lastName= user.lastName;
    this.qualifications= user.qualifications;
    this.companyName= user.companyName;
    this.jobTitle= user.jobTitle;
    this.dateOfBirth= user.dateOfBirth;
    this.homeLocation= user.homeLocation;
    this.headLine= user.headLine;
    this.fullBio= user.fullBio;
    this.countryCode= user.countryCode;
    this.mobileNumber= user.mobileNumber;
    this.roles= user.roles;
    this.interests= user.interests;
    this.userStatus= user.userStatus;
    this.numberOfConnection= user.numberOfConnection;
    this.userPhotoUrl= user.userPhotoURL;
    this.dynamicLink= user.dynamicLink;
    this.gender= user.gender;
    this.newUser= user.newUser;
    if(Helper.isBlank(user.userPhotoURL)){
      this.userPhotoUrl= user.userPhotoUrl;
    }
  }
}
