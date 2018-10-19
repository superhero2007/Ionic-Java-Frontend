import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Book } from './book.model';
import { BookService } from './book.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-book',
    templateUrl: 'book.html'
})
export class BookPage {
    books: Book[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private bookService: BookService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.books = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.bookService.query().subscribe(
            (response) => {
                this.books = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Book) {
        return item.id;
    }

    open(slidingItem: any, item: Book) {
        let modal = this.modalCtrl.create('BookDialogPage', {item: item});
        modal.onDidDismiss(book => {
            if (book) {
                if (book.id) {
                    this.bookService.update(book).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Book updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.bookService.create(book).subscribe(data => {
                        this.books.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Book added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(book) {
        this.bookService.delete(book.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Book deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(book: Book) {
        this.navCtrl.push('BookDetailPage', {id: book.id});
    }
}
