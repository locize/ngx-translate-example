import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';

// locizer is only used here to send the missing keys to locize
import locizer from 'locizer';
locizer.init({
  projectId: environment.locizeProjectId,
  apiKey: !environment.production && environment.locizeApiKey, // only needed if you want to add new keys via locizer - remove on production!
  version: environment.locizeVersion
});
export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle (params: MissingTranslationHandlerParams) {
    locizer.add(environment.locizeNamespace, params.key);
    return params.key;
  }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, `https://api.locize.app/${environment.locizeProjectId}/${environment.locizeVersion}/`, `/${environment.locizeNamespace}`);
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
