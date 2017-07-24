import { Injectable } from '@angular/core';
import { Post, PostWithAuthor } from '../models/post';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { AuthorService } from './author.service';
import { Author } from '../models/author';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase/app';

@Injectable()
export class PostService {
  readonly postsPath = 'posts';
  readonly postBatchSize = 8;

  postsWithAuthorStream: Observable<PostWithAuthor[]>;
  private postIncrementStream: Subject<number>;

  public hideLoadMoreBtn = false;

  constructor(private db: AngularFireDatabase,
    private authorService: AuthorService) {
    this.postIncrementStream = new BehaviorSubject<number>(this.postBatchSize);
    const numPostsStream: Observable<number> = this.postIncrementStream
      .scan<number>((previousTotal: number, currentValue: number) => {
        return previousTotal + currentValue;
      });
    const postsStream: Observable<Post[]> = numPostsStream
      .switchMap<number, Post[]>((numPosts: number) => {
        return this.db.list(this.postsPath, {
          query: {
            limitToLast: numPosts,
          }
        });
      });

    this.postsWithAuthorStream = Observable.combineLatest<PostWithAuthor[]>(
      postsStream,
      this.authorService.authorMapStream,
      numPostsStream,
      (posts: Post[], authorMap: Map<string, Author>, numPostsRequested: number) => {
        const postsWithAuthor: PostWithAuthor[] = [];
        this.hideLoadMoreBtn = numPostsRequested > posts.length;
        for (const post of posts) {
          const postWithAuthor = new PostWithAuthor(post);
          postWithAuthor.author = authorMap[post.authorKey];
          postsWithAuthor.push(postWithAuthor);
        }
        return postsWithAuthor;
      });
  }

  add(post: Post): void {
    firebase.database().ref().child(this.postsPath).push(post);
  }

  displayMorePosts(): void {
    this.postIncrementStream.next(this.postBatchSize);
  }

  remove(keyToRemove: string): void {
    firebase.database().ref(`/${this.postsPath}/${keyToRemove}`).remove();
    // below is with angular fire
    // this.db.object(`/${this.postsPath}/${keyToRemove}`).remove();
  }

}
