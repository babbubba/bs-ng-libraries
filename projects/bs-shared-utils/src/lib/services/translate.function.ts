import { HttpBackend, HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpBackend) {
  let client = new HttpClient(http);
  return new TranslateHttpLoader(client);
}
