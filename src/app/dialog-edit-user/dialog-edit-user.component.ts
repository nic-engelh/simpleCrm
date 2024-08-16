import { Component, inject, OnInit } from '@angular/core';
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
import {
  Firestore,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
    MatDatepickerModule,
    CommonModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent implements OnInit {
  user = new User();
  loading: boolean = false;
  birthDateCache = new Date();
  userId: string = "";

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: Firestore) { }

  ngOnInit(): void {
    console.log("updated UserId", this.userId);
  }

  transformBirthDate() {
    this.user.birthDate = this.birthDateCache.getTime();
  }

  closeEditUserDialog() {
    this.dialogRef.close();
  }

  saveEditedUser() {
    this.updateDocument();
  }

  updateDocument() : void {
    this.loading = true;
    const userRef = doc(this.firestore, `users/${this.userId}`);
    console.log("updated User", this.user);
    if (!this.user.id) {
      this.user.id = this.userId;
    }
    const updatedUser = this.user.toJSON();
    updateDoc(userRef, updatedUser);
    this.loading = false;
  }
}
