import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Book } from './book.model';
import { BookService } from './book.provider';
import { Author, AuthorService } from '../author';

@IonicPage()
@Component({
    selector: 'page-book-dialog',
    templateUrl: 'book-dialog.html'
})
export class BookDialogPage {

    book: Book;
    authors: Author[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private authorService: AuthorService,
                private bookService: BookService) {
        this.book = params.get('item');
        if (this.book && this.book.id) {
            this.bookService.find(this.book.id).subscribe(data => {
                this.book = data;
            });
        } else {
            this.book = new Book();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.book.id : null],
            title: [params.get('item') ? this.book.title : null,  Validators.required],
            genre: [params.get('item') ? this.book.genre : null,  Validators.required],
            language: [params.get('item') ? this.book.language : null,  Validators.required],
            year: [params.get('item') ? this.book.year : null,  Validators.required],
            author: [params.get('item') ? this.book.author : '',Validators.required],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.authorService.query()
            .subscribe(data => { this.authors = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the book, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    compareAuthor(first: Author, second: Author): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackAuthorById(index: number, item: Author) {
        return item.id;
    }
}
