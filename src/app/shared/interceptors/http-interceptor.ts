import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { CacheInterceptor } from "./cache-interceptor";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        var token=localStorage.getItem('token');
        if(token){
            const newReq=req.clone(
                {
                    headers: req.headers.set('Authorization','Bearer'+token)
                });
                return next.handle(newReq);
        } 
        else {
            return next.handle(req);
        }
    }
};

@NgModule({
    providers:[
        {
            provide:HTTP_INTERCEPTORS,
            useClass:HttpRequestInterceptor,
            multi:true
        },
        {
            provide:HTTP_INTERCEPTORS,
            useClass:CacheInterceptor,
            multi:true
        }
    ]
})
export class HttpInterceptorModule{}