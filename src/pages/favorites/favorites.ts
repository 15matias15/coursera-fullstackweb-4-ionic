import { Component, OnInit, Inject } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ItemSliding,
  ToastController,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage implements OnInit {
  favorites: Dish[];
  errMess: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('BaseURL') public BaseURL,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.favoriteservice
      .getFavorites()
      .subscribe(
        favorites => (this.favorites = favorites),
        errmess => (this.errMess = errmess)
      );
  }

  deleteFavorite(item: ItemSliding, id: number) {
    const alert = this.alertCtrl.create({
      title: 'Confirm Title',
      message: 'Do you want to delete Favorite ' + id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            const loading = this.loadingCtrl.create({
              content: 'Deleting . . .'
            });
            const toast = this.toastCtrl.create({
              message: 'Dish  ' + id + ' deleted successfully',
              duration: 3000
            });
            loading.present();
            this.favoriteservice.deleteFavorite(id).subscribe(
              favorites => {
                this.favorites = favorites;
                loading.dismiss();
                toast.present();
              },
              errmess => {
                this.errMess = errmess;
                loading.dismiss();
              }
            );
            this.storage.remove('id');
          }
        }
      ]
    });
    alert.present();
    item.close();
  }
}
