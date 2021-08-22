// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  locizeProjectId: '18a555a3-2dfa-4ded-b6d0-b50b02bd6bcb',
  locizeVersion: 'latest',
  locizeNamespace: 'translation',
  locizeApiKey: '3a03f975-633b-405f-94b9-6e72a16f6092' // only needed if you want to add new keys via locizer - remove on production!
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
