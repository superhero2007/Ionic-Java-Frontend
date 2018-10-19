import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorDetailPage } from './author-detail';
import { AuthorService } from './author.provider';

@NgModule({
    declarations: [
        AuthorDetailPage
    ],
    imports: [
        IonicPageModule.forChild(AuthorDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        AuthorDetailPage
    ],
    providers: [AuthorService]
})
export class AuthorDetailPageModule {
}
