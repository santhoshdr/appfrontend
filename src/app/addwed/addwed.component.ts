import { Component, OnInit } from '@angular/core';
import { Weduser } from '../weduser';

@Component({
  selector: 'app-addwed',
  templateUrl: './addwed.component.html',
  styleUrls: ['./addwed.component.css']
})
export class AddwedComponent {
  title = 'app';
  topics = ['Angular', 'React', 'Vue'];
  wedUser = new Weduser('firstName', 'lastName', "dateofBirth", 'age', 'gender');
  topicHasError = true;
  submitted = false;
  errorMsg = '';


  constructor() { }

  
  onSubmit() {
    this.submitted = true;
   
  }

}
