import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../../shared/comment';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})
export class CommentPage {
  comment: Comment;
  commentForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder
  ) {
    this.commentForm = this.formBuilder.group({
      rating: 5,
      author: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    let date = new Date();
    let datevalue = date.toISOString();
    this.comment = this.commentForm.value;
    this.comment['date'] = datevalue;
    this.viewCtrl.dismiss(this.comment);
  }
}
