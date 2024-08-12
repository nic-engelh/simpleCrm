import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { UserComponent } from '../app/user/user.component';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, UserComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  id: string | null = null;
  document: any;

  constructor(private route: ActivatedRoute, private afs: Firestore) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      const docRef = doc(this.afs, `users/${this.id}`);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          this.document = docSnap.data();
          console.log("Document:", this.document)
        } else {
          console.log("No such document!");
        }
      });
    }
  }
  }

