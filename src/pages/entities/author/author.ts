import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Author } from './author.model';
import { AuthorService } from './author.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-author',
    templateUrl: 'author.html'
})
export class AuthorPage {
    authors: Author[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private authorService: AuthorService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.authors = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.authorService.query().subscribe(
            (response) => {
                this.authors = response;
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

    trackId(index: number, item: Author) {
        return item.id;
    }

    open(slidingItem: any, item: Author) {
        let modal = this.modalCtrl.create('AuthorDialogPage', {item: item});
        modal.onDidDismiss(author => {
            if (author) {
                if (author.id) {
                    this.authorService.update(author).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Author updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.authorService.create(author).subscribe(data => {
                        this.authors.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Author added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(author) {
        this.authorService.delete(author.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Author deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(author: Author) {
        this.navCtrl.push('AuthorDetailPage', {id: author.id});
    }
}
