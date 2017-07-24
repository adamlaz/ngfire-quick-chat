import { FirebaseFlatSnapshot } from './firebase-flat-snapshot';

export class Post extends FirebaseFlatSnapshot {
  public authorKey: string;
  public body: string;

  constructor(obj?: any) {
    super(obj);
    this.authorKey = obj && obj.DisplayName || '';
    this.body = obj && obj.photoURL || '';
  }
}
