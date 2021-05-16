// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
  apiKey: "AIzaSyCFi25QcooWTvlT7cgDY1zB4apJFy8JTrE",
  authDomain: "punjabimahasangh.firebaseapp.com",
  databaseURL: "https://punjabimahasangh.firebaseio.com",
  projectId: "punjabimahasangh",
  storageBucket: "punjabimahasangh.appspot.com",
  messagingSenderId: "330183790986",
  appId: "1:330183790986:web:0015013912f838c2167873",
  measurementId: "G-NFFQ398WKY"
  },
  cloudFunctions : {
    createOrder: 'https://us-central1-punjabimahasangh.cloudfunctions.net/createOrder',
    capturePayment: 'https://us-central1-punjabimahasangh.cloudfunctions.net/capturePayments'
  },
  RAZORPAY_KEY_ID: 'rzp_test_KxB6HgNu3XgvYE'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
