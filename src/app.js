import {HttpClient} from 'aurelia-http-client';

//import myObject from 'text!./example-data.json';

//
// To get json to load, I followed graemechristie's advice at https://github.com/aurelia/cli/issues/300#issuecomment-251106951
//
// This allows the import to work, but if you do an import, then the bundle is no longer rebuilt.
//

 

export class App {
  constructor() {
    this.message = 24;
    this.loadedData = null;

    let client = new HttpClient();

    client.get('/scripts/assets/example-data.json')
    .then(data => {
      this.loadedData = JSON.parse(data.response);
    });
    
  }
}
