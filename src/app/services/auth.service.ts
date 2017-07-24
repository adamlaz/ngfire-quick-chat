import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthorService } from './author.service';

@Injectable()
export class AuthService {

  public isSignedInStream: Observable<boolean>;
  public displayNameStream: Observable<string>;
  public photoURL: string;
  public _currentUserUid: string;

  constructor(private afAuth: AngularFireAuth,
  private authorService: AuthorService,
  private router: Router) {
    this.afAuth.authState.subscribe( (user: firebase.User) => {
      if (user) {
        console.log('User is signed in as', user.displayName);
        this.photoURL = user.photoURL;
        this._currentUserUid = user.uid;
      } else {
        console.log('User is not signed in');
        this.photoURL = '';
        this._currentUserUid = '';
      }
    } );
    this.isSignedInStream = this.afAuth.authState
    .map<firebase.User, boolean>((user: firebase.User) => {
      return user != null;
    });
    this.displayNameStream = this.afAuth.authState
    .map<firebase.User, string>((user: firebase.User) => {
      if (user) {
        return user.displayName;
      }
      return '';
    });
   }

get currentUserUid(): string {
  return this._currentUserUid;
}

signInWithGoogle(): void {
  this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  .then((result: any) => {
    this.router.navigate(['/']);
    const user: firebase.User = result.user;
    console.log('Push user to db', user);
    this.authorService.updateAuthor(user.uid, user.displayName, user.photoURL);
  });
}

signOut(): void {
  this.afAuth.auth.signOut();
  this.router.navigate(['/signin']);
}

}
