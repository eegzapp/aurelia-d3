import { bindable } from 'aurelia-framework';

export class SpamSpam {
  @bindable spamMessage;
  constructor() {
    this.spamMessage = 'Spam, mighty spam!';
  }
}