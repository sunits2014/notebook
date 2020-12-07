import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: IUser;

  constructor(private activeRoute: ActivatedRoute) {
    this.user = {} as IUser;
    this.activeRoute.data.subscribe(value => {
      this.user = value.user;
    })
   }

  ngOnInit(): void {
  }

}
