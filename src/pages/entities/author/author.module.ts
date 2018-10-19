import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorPage } from './author';
import { AuthorService } from './author.provider';

@NgModule({
    declarations: [
        AuthorPage
    ],
    imports: [
        IonicPageModule.forChild(AuthorPage),
        TranslateModule.forChild()
    ],
    exports: [
        AuthorPage
    ],
    providers: [AuthorService]
})
export class AuthorPageModule {
}
