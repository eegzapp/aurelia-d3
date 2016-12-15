import {HttpClient} from 'aurelia-http-client';
import $ from 'jquery';
import gridstack from 'gridstack';

export class Dashboard {
    constructor() {
        this.loadedData = null;

        let client = new HttpClient();

        client.get('/scripts/assets/example-data.json')
        .then(data => {
            this.loadedData = JSON.parse(data.response);
        });


    $(function () {
        var options = {
            cellHeight: 80,
            verticalMargin: 10
        };
        $('.grid-stack').gridstack(options);
    });

    }

}