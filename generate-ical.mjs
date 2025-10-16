import fs from "node:fs";
import { getCommemorativeDatesForYear } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

let icsTitle=`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CommemorativeDays//EN
`;

for(let year=2020; year<=2030; year++){
    const comDay = getCommemorativeDatesForYear(year, daysData);

    for(const [key,value] of Object.entries(comDay)){
        const part = key.split("-");
        const fullDatePart = part.join("");

        const uidName = value.split(" ").join("-");
        const uid = `${fullDatePart}-${uidName}@commemorative`;

        icsTitle += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${fullDatePart}T000000Z
DTSTART;VALUE=DATE:${fullDatePart}
DTEND;VALUE=DATE:${getNextDay(fullDatePart)}
SUMMARY:${value}
END:VEVENT


`;
    }
}
function getNextDay(yyyymmdd) {
    const year = Number(yyyymmdd.slice(0, 4));
    const month = Number(yyyymmdd.slice(4, 6)) - 1;
    const day = Number(yyyymmdd.slice(6, 8));
    const date = new Date(year, month, day);
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10).split("-").join("");
  }
icsTitle +=`END:VCALENDAR`;
fs.writeFileSync("days.ics", icsTitle, "utf8");
