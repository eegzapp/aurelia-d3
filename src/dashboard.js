import {HttpClient} from 'aurelia-http-client';

export class Dashboard {
    constructor() {
        this.loadedData = null;

        let client = new HttpClient();

        client.get('/scripts/assets/example-data.json')
        .then(data => {
            this.loadedData = JSON.parse(data.response);
        });
    }
}