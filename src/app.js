// import $ from "jquery";

import {Car} from './classes/car.js';
import {Drone} from './classes/drone.js';
import {fleet} from './fleet-data.js';
import {FleetDataService} from './services/fleet-data-service.js';

import {TitleBar} from "./ui/title-bar.js";
import {Button} from "./ui/button.js";
import {Image} from "./ui/image.js";

let titleBar = new TitleBar('Click Me');
titleBar.appendToElement($('body'));


// let im = new Image('src/images/drone.jpg');
// im.appendToElement($('body'));