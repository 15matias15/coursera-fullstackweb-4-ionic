import { Component, Inject } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ActionSheetController,
  ModalController
} from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html'
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;
  comment: Comment;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('BaseURL') public BaseURL,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) {
    this.dish = navParams.get('dish');
    this.favorite = this.favoriteservice.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;

    let total = 0;
    this.dish.comments.forEach(comment => (total += comment.rating));
    this.avgstars = (total / this.numcomments).toFixed(2);
  }

  addToFavorites() {
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl
      .create({
        message: 'Dish ' + this.dish.name + ' addrd as a favorite successfully',
        position: 'middle',
        duration: 3000
      })
      .present();
  }

  displayActionSheet() {
    this.actionSheetCtrl
      .create({
        title: 'Select Actions',
        buttons: [
          {
            text: 'Add to Favorites',
            handler: () => {
              this.addToFavorites();
            }
          },
          {
            text: 'Add Comment',
            handler: () => {
              this.openComment();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      })
      .present();
  }

  openComment() {
    const modal = this.modalCtrl.create(CommentPage);
    modal.present();
    modal.onDidDismiss(comments => {
      console.log(comments);
      this.dish.comments.push(comments);
    });
  }
}
