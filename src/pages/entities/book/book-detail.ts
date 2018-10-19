import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Book } from './book.model';
import { BookService } from './book.provider';

@IonicPage({
    segment: 'book-detail/:id',
    defaultHistory: ['EntityPage', 'bookPage']
})
@Component({
    selector: 'page-book-detail',
    templateUrl: 'book-detail.html'
})
export class BookDetailPage {
    book: Book;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private bookService: BookService, private toastCtrl: ToastController) {
        this.book = new Book();
        this.book.id = params.get('id');
    }

    ionViewDidLoad() {
        this.bookService.find(this.book.id).subscribe(data => this.book = data);
    }

    open(item: Book) {
        let modal = this.modalCtrl.create('BookDialogPage', {item: item});
        modal.onDidDismiss(book => {
            if (book) {
                this.bookService.update(book).subscribe(data => {
                    this.book = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Book updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
