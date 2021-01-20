// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAFrKC0VrzFhlUdNBY9MJAZ0CRrdQQCCpY",
    authDomain: "blockchain-app-4cb5d.firebaseapp.com",
    databaseURL: "https://blockchain-app-4cb5d.firebaseio.com",
    projectId: "blockchain-app-4cb5d",
    storageBucket: "blockchain-app-4cb5d.appspot.com",
    messagingSenderId: "516697128690",
    appId: "1:516697128690:web:be970f056c799fd1bc9a6b",
    measurementId: "G-74MM034S1R"
  },
  apiUrl: 'http://localhost:3000/api/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
