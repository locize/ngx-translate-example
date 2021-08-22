import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import locizer from 'locizer';

const locizeProjectId = '18a555a3-2dfa-4ded-b6d0-b50b02bd6bcb';
const locizeVersion = 'latest';
const locizeNamespace = 'translation';
const locizeApiKey = '3a03f975-633b-405f-94b9-6e72a16f6092'; // only needed if you want to add new keys via locizer - remove on production!

locizer.init({
  projectId: locizeProjectId,
  apiKey: locizeApiKey, // only needed if you want to add new keys via locizer - remove on production!
  version: locizeVersion
});

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, `https://api.locize.app/${locizeProjectId}/${locizeVersion}/`, `/${locizeNamespace}`);
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle (params: MissingTranslationHandlerParams) {
    locizer.add(locizeNamespace, params.key);
    return params.key;
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
