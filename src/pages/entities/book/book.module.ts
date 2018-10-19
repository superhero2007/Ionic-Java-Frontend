import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { BookPage } from './book';
import { BookService } from './book.provider';

@NgModule({
    declarations: [
        BookPage
    ],
    imports: [
        IonicPageModule.forChild(BookPage),
        TranslateModule.forChild()
    ],
    exports: [
        BookPage
    ],
    providers: [BookService]
})
export class BookPageModule {
}
