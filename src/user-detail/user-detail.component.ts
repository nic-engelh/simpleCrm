import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserComponent } from '../app/user/user.component';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { User } from '../models/user.class';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../app/dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../app/dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    UserComponent,
    MatProgressSpinnerModule,
    UserComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  id: string = "";
  document: any;
  user = new User;
  private subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      if(params) {
        this.id = params.get('id') ?? '';
      }

    });

    if (this.id) {
      const docRef = doc(this.firestore, `users/${this.id}`);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          this.user = docSnap.data() as User;
          console.log('User:', this.user);
        } else {
          console.log('No such user!');
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  editUserDetails() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    if (dialog) {
      dialog.componentInstance.user = new User(this.user);
      dialog.componentInstance.userId = this.id;
      console.log("transfered User", this.user);
    }
  }

  editUserAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    if (dialog) {
      dialog.componentInstance.user = new User(this.user);
      dialog.componentInstance.userId = this.id;
      console.log("transfered User", this.user);
    }
  }
}
