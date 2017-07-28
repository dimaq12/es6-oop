// import $ from "jquery";

import {Car} from './classes/car.js';
import {Drone} from './classes/drone.js';
import {fleet} from './fleet-data.js';
import {FleetDataService} from './services/fleet-data-service.js';

import {TitleBar} from "./ui/title-bar.js";
import {Button} from "./ui/button.js";
import {Image} from "./ui/image.js";
import {DataTable} from "./ui/data-table.js";


let headers = 'License Miles Model Miles'.split(' ');
let dataService = new FleetDataService();
dataService.loadData(fleet)
let dt = new DataTable(headers, dataService.cars);
dt.appendToElement($('body'));
// let titleBar = new TitleBar('Click Me');
// titleBar.addLink('Home', '')
// titleBar.addLink('Cars', '')
// titleBar.addLink('Drones', '')
// titleBar.addLink('Map', '')
// titleBar.appendToElement($('body'));


// let im = new Image('src/images/drone.jpg');
// im.appendToElement($('body'));