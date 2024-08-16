import { Component } from '@angular/core';
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
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  loading = false;
  user = new User();
  userId: string = "";

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>,private firestore: Firestore) {}


  saveEditedUser() {
    this.updateDocument();
  }

  closeEditUserDialog() {
    this.dialogRef.close();
  }


  updateDocument() : void {
    const userRef = doc(this.firestore, `users/${this.userId}`);
    console.log("updated User", this.user);
    if (!this.user.id) {
      this.user.id = this.userId;
    }
    const updatedUser = this.user.toJSON();
    updateDoc(userRef, updatedUser);
  }

}
