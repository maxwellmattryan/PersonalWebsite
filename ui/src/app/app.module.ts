import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthInterceptor, AuthService } from '@ui/core/auth';
import { HttpErrorInterceptor } from '@ui/core/http/http-error.interceptor';
import { HttpRequestInterceptor } from '@ui/core/http/http-request.interceptor';
import { NotificationService } from '@ui/core/services';

import { MarkdownModule, MarkedOptions, MARKED_OPTIONS, MarkedRenderer } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '@ui/environments/environment';
import { CoreModule } from '@ui/core/core.module';
import { MaterialModule } from '@ui/modules/material/material.module';

export function markedOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();

    const linkRenderer = renderer.link;
    renderer.link = (href, title, text) => {
        const html = linkRenderer.call(renderer, href, title, text);

        const isAppUrl = href.includes(environment.BASE_URL);
        const replacement = isAppUrl ? '<a role="link" '
            : '<a role="link" target="_blank" rel="nofollow noopener noreferrer" ';

        let result: string = html.replace(/^<a /, replacement);

        return result;
    }

    const listitemRenderer = renderer.listitem;
    renderer.listitem = (text: string) => {
        const html = listitemRenderer.call(renderer, text);

        let result: string = html.replace(/^<li><p>/, '<li>');
        result = result.replace(/<\/p><\/li>$/, '</li>');

        return result;
    };

    return {
        renderer,
        gfm: true,
        breaks: false,
        pedantic: false,
    };
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CoreModule,
        FormsModule,
        HttpClientModule,
        MarkdownModule.forRoot({
            loader: HttpClient,
            markedOptions: {
                provide: MARKED_OPTIONS,
                useFactory: markedOptionsFactory,
            }
        }),
        MaterialModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: function(notificationService: NotificationService) {
                return new HttpErrorInterceptor(notificationService);
            },
            multi: true,
            deps: [NotificationService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: function(router: Router, authService: AuthService, notificationService: NotificationService) {
                return new AuthInterceptor(router, authService, notificationService);
            },
            multi: true,
            deps: [Router, AuthService, NotificationService]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
