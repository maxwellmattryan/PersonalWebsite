import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import { environment } from '@app/environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';

export function markedOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();
    const linkRenderer = renderer.link;

    renderer.link = (href, title, text) => {
        const html = linkRenderer.call(renderer, href, title, text);
        return html.replace(/^<a /, '<a role="link" target="_blank" rel="nofollow noopener noreferrer" ');
    }

    return {
        renderer,
        gfm: true,
        breaks: false,
        pedantic: false,
        smartLists: true,
        smartypants: false,
    };
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        environment.production || environment.staging ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CoreModule,
        FormsModule,
        HttpClientModule,
        MarkdownModule.forRoot({
            loader: HttpClient,
            markedOptions: {
                provide: MarkedOptions,
                useFactory: markedOptionsFactory
            }
        }),
        ReactiveFormsModule,
        SharedModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
