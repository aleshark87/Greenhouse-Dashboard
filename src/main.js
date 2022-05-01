import * as ThingDescription from './js-modules/ThingDescription.js'
import {ajaxRequest} from './js-modules/AjaxRequests.js'

const thing_id = 'com.project.thesis:greenhouse01';

await ThingDescription.init(thing_id);
console.log(ThingDescription.getFeaturesTD());



