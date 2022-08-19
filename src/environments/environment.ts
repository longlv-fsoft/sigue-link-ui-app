// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backend_api: {
    menu_context: '/api/v1/app-configuration/menu',
    login_context: '/api/v1/auth/login',
    updateUserMetadata: '/api/v1/users/metadata',
    channel_api: '/api/v1/channels',
  },
  social: {
    twitter: 'https://twitter.com/longlv91',
    youtube: 'https://www.youtube.com/channel/UCPZU2uEIUCSW1ZP-jhG_tvw',
    facebook: 'https://www.facebook.com/longlv91',
    linkedin: 'https://www.linkedin.com/in/longle73/',
    github: 'https://github.com/longlv91',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
