// Script: switches on light at 22:00 and switches it off at 06:00 every day.

import * as dOut from "../../io-module-din-8/fv02_02/dout"
import * as cal from "../../clu-zwave-2/fv515_03/calendar"
import { CluZWave2, CluZWave2Raw } from "../../clu-zwave-2/fv515_03/clu-zwave-2"


declare const DOU3948: dOut.DOutRaw; //Light circuit Object Id
declare const CAL1234: cal.CalendarRaw; //Calendar Object Id
declare const CLU221005096: CluZWave2Raw; //CLU Object Id

const light = new dOut.DOut(DOU3948);
const calendar = new cal.Calendar(CAL1234);
const clu = new CluZWave2(CLU221005096);

//Setup
calendar.rule = "0 6,22 * * *" //Cron expression for 22:00 and 06:00 every day. The calendar will trigger at these times and switch the light on or off depending on the time of day.
calendar.addOnCalendar(() => {
    if(clu.hour === 22) {
        light.switchOn(0); //Switch on the light at 22:00
    } else if(clu.hour === 6) {
        light.switchOff(0); //Switch off the light at 06:00
    }
})

calendar.start(); //Start the calendar to begin triggering events based on the defined rule.