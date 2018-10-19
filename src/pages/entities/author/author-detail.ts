import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Author } from './author.model';
import { AuthorService } from './author.provider';

@IonicPage({
    segment: 'author-detail/:id',
    defaultHistory: ['EntityPage', 'authorPage']
})
@Component({
    selector: 'page-author-detail',
    templateUrl: 'author-detail.html'
})
export class AuthorDetailPage {
    author: Author;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private authorService: AuthorService, private toastCtrl: ToastController) {
        this.author = new Author();
        this.author.id = params.get('id');
    }

    ionViewDidLoad() {
        this.authorService.find(this.author.id).subscribe(data => this.author = data);
    }

    open(item: Author) {
        let modal = this.modalCtrl.create('AuthorDialogPage', {item: item});
        modal.onDidDismiss(author => {
            if (author) {
                this.authorService.update(author).subscribe(data => {
                    this.author = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Author updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
