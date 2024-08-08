import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ MatProgressBarModule ,MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, CommonModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  user = new User();
  loading: boolean = false;
  birthDateCache = new Date();
  items$: Observable<any[]>;
  private firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    this.items$ = this.getCollectionData('items');
  }

  private getCollectionData(collectionName: string) {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef);
  }

  saveUser() {
    this.transformBirthDate();
    this.loading = true;
    console.log(this.user);
    this.addUserToFirestore();
  }

  private addUserToFirestore() {
    const usersCollection = collection(this.firestore, 'users');
    const userDocRef = doc(usersCollection);
    const userData = { ... this.user }
    setDoc(userDocRef, userData)
      .then((result) => {
        this.loading = false;
        console.log('Adding user is done:', result);
        this.dialogRef.close();
      })
      .catch((error) => {
        this.loading = false;
        console.error('Error adding user:', error);
        this.dialogRef.close();
      });
  }

  transformBirthDate() {
    this.user.birthDate = this.birthDateCache.getTime();
  }
}
