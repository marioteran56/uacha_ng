import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({ providedIn: 'root' })
export class DataFirestoreService {

  isMenuCollapsed: boolean = false;

  constructor(
    private storage: AngularFireStorage,
  ) { }

  uploadFile(filePath: string, file: any) {
    return this.storage.upload(filePath, file);
  }

  deleteFile(fileURL: string) {
    return this.storage.storage.refFromURL(fileURL).delete();
  }
}
