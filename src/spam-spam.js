import { bindable } from 'aurelia-framework';

export class SpamSpam {
  @bindable message;
  constructor() {
    this.message = 'Spam, mighty spam!';
  }
}