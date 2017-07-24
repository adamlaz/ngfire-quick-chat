import { Injectable } from '@angular/core';
import { Author } from '../models/author';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class AuthorService {
  readonly authorsPath = 'authors';

  public authorMapStream: FirebaseObjectObservable<Map<string, Author>>;

  constructor(private db: AngularFireDatabase) {
    this.authorMapStream = this.db.object(this.authorsPath);
   }

  updateAuthor(authorKey: string, displayName: string, photoURL: string) {
    const author = new Author({
      displayName: displayName,
      photoURL: photoURL,
    });
    this.db.object(`/${this.authorsPath}/${authorKey}`).set(author);
  }
}
