// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const SERVER_URL = 'http://129.8.199.173/csci150/';
export const LOGIN_URL = SERVER_URL+'log-in.php';
export const REGISTER_URL = SERVER_URL+'register.php';
export const CLASSES_URL = SERVER_URL+'getClasses.php';
export const ENTRIES_URL = SERVER_URL+'getEntries.php';
export const CHECKIN_URL = SERVER_URL+'getSession.php';
export const ATTENDANCE_URL = SERVER_URL+'updateAttendance.php';
export const GETCLASS_URL = SERVER_URL+'getevent.php';
export const STORE_URL = SERVER_URL+'storeEvent.php';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
