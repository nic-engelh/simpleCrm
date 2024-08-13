import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserComponent } from '../app/user/user.component';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    UserComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  id: string | null = null;
  document: any;
  private subscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private afs: Firestore) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    if (this.id) {
      const docRef = doc(this.afs, `users/${this.id}`);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          this.document = docSnap.data();
          console.log('Document:', this.document);
        } else {
          console.log('No such document!');
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
