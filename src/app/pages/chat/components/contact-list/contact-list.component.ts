import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ChatService } from '../../chat.service';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
  @Input()
  currentNumber: string;
  @Output()
  OnContactSelected: EventEmitter<string> = new EventEmitter();

  isAddingContact = false;
  newContactNumber = null;
  hasUnsavedContact = false;
  isUpdating = false;
  subscription: Subscription;

  constructor(private service: ChatService) { }

  ngOnInit() {
    this.subscription = timer(0, 1000).pipe(
      switchMap(() => this.getUpdate())
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async getUpdate() {
    if (this.isUpdating) { return; }
    try {
      this.isUpdating = true;
      let e = await this.service.GetContactUpdate(this.currentNumber);
      this.contacts = [];

      let list = e.map(function (n) {
        return { numberId: n.numberId, picture: 'https://api.adorable.io/avatars/50/' + n.numberId, title: n.contactDateUTC }
      });

      if (this.hasUnsavedContact) {
        let index = list.findIndex(n => n.numberId == this.newContactNumber)
        if (index != -1) {
          list.splice(index, 1);
        }
      }

      this.contacts = list;
    } catch (e) {
      console.log(e);
    }
    this.isUpdating = false;
  }

  contacts = [];

  clickAddContact() {
    this.newContactNumber = null;
    this.isAddingContact = true;
    this.hasUnsavedContact = false;
  }

  selectContact(e: string) {
    this.OnContactSelected.emit(e);
    this.hasUnsavedContact = false;
  }

  cancelContactAdd() {
    this.isAddingContact = false;
    this.newContactNumber = null;
  }

  confirmContactAdd() {
    this.isAddingContact = false;
    this.OnContactSelected.emit(this.newContactNumber);
    this.hasUnsavedContact = true;
  }
}
