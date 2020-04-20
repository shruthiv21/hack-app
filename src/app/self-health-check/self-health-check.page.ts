import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

import { SelfHealthCheckService, Message } from './self-health-check.service';

@Component({
  selector: 'app-self-health-check',
  templateUrl: './self-health-check.page.html',
  styleUrls: ['./self-health-check.page.scss'],
})
export class SelfHealthCheckPage implements OnInit {

  messages: Observable<Message[]>;

  formValue: string;

  constructor(public selfHealthCheckService: SelfHealthCheckService) { }

  ngOnInit() {
    this.messages = this.selfHealthCheckService.conversation.asObservable().pipe(
      scan((acc, val) => acc.concat(val))
    );
  }

  public sendMessages() {
    this.selfHealthCheckService.converse(this.formValue);
    this.formValue = '';
  }

}
