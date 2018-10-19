import { AuthorService } from '../author';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { BookDialogPage } from './book-dialog';
import { BookService } from './book.provider';

@NgModule({
    declarations: [
        BookDialogPage
    ],
    imports: [
        IonicPageModule.forChild(BookDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        BookDialogPage
    ],
    providers: [
        BookService,
        AuthorService,
    ]
})
export class BookDialogPageModule {
}
