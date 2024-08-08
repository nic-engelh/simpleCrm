import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    UserComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user = new User();

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsersSnapshotChanges();
    this.getUsersValueChanges();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  getUsersValueChanges(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }

  getUsersSnapshotChanges(): Observable<any[]> {
    return this.firestore.collection('users').snapshotChanges();
  }


}
