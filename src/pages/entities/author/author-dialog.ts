import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Author } from './author.model';
import { AuthorService } from './author.provider';

@IonicPage()
@Component({
    selector: 'page-author-dialog',
    templateUrl: 'author-dialog.html'
})
export class AuthorDialogPage {

    author: Author;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private authorService: AuthorService) {
        this.author = params.get('item');
        if (this.author && this.author.id) {
            this.authorService.find(this.author.id).subscribe(data => {
                this.author = data;
            });
        } else {
            this.author = new Author();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.author.id : null],
            firstName: [params.get('item') ? this.author.firstName : null,  Validators.required],
            lastName: [params.get('item') ? this.author.lastName : null,  Validators.required],
            age: [params.get('item') ? this.author.age : null,  Validators.required],
            country: [params.get('item') ? this.author.country : null,  Validators.required],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the author, so return it
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

}
