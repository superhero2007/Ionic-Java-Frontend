import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorDialogPage } from './author-dialog';
import { AuthorService } from './author.provider';

@NgModule({
    declarations: [
        AuthorDialogPage
    ],
    imports: [
        IonicPageModule.forChild(AuthorDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        AuthorDialogPage
    ],
    providers: [
        AuthorService
    ]
})
export class AuthorDialogPageModule {
}
