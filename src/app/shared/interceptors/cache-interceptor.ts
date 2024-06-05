import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpCacheService } from "../services/http-cache.service";
import { of } from "rxjs";
import { tap } from "rxjs/operators";



@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: HttpCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      this.cacheService.invalidateCache();
      return next.handle(req);
    }

    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url)!;
    if (cachedResponse) {
      console.log(`Returning a cached response : ${cachedResponse}`);
      return of(cachedResponse);
    }
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(`Adding item to cache:${event}`);
            this.cacheService.put(req.url, event)
          }
        })
      )
  }
}
