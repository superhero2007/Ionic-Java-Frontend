import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { BookDetailPage } from './book-detail';
import { BookService } from './book.provider';

@NgModule({
    declarations: [
        BookDetailPage
    ],
    imports: [
        IonicPageModule.forChild(BookDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        BookDetailPage
    ],
    providers: [BookService]
})
export class BookDetailPageModule {
}
