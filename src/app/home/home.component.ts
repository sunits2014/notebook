import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: IUser;

  constructor(private activeRoute: ActivatedRoute) {
    this.user = {} as IUser;
    this.user = this.activeRoute.snapshot.data.images.user;
   }

  ngOnInit(): void {
  }

}
