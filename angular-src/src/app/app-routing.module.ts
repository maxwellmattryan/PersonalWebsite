import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './components/blog/blog.component';
import { EditorComponent } from './components/editor/editor.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { TopicComponent } from './components/topic/topic.component';

const routes: Routes = [
    // CAUTION: Children routes aren't used because the components themselves are not nested
    { path: '',                     component: HomeComponent        },
    {
        path: 'admin',
        loadChildren: './modules/admin/admin.module#AdminModule'
    },
    { path: 'blog',                 component: BlogComponent        },
    { path: 'blog/posts/:uri',      component: PostComponent        },
    { path: 'blog/topics/:uri',     component: TopicComponent       },
    { path: 'editor',               component: EditorComponent      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
