import { FirebaseFlatSnapshot } from './firebase-flat-snapshot';

export class Author extends FirebaseFlatSnapshot {
  public displayName: string;
  public photoURL: string;

  constructor(obj?: any) {
    super(obj);
    this.displayName = obj && obj.DisplayName || '';
    this.photoURL = obj && obj.photoURL || '';
  }
}
