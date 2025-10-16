import days from "./days.json" with { type: "json" };


export function getDates(year, month, day, occurrence) {
  const saveDate = [];
  const occurrences = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    last: -1
  };

  const daysOfWeek = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  

  const targetDay = daysOfWeek[day.toLowerCase()];
  const targetOcc = occurrences[occurrence.toLowerCase()];
  const newDate = new Date(year, month - 1, 1);

  while (newDate.getMonth() === month - 1) {
    if (newDate.getDay() === targetDay) {
      saveDate.push(new Date(newDate));
    }
    newDate.setDate(newDate.getDate() + 1);
  }
  if (targetOcc === -1) {
    return saveDate[saveDate.length - 1];
  }
  return saveDate[targetOcc - 1];
}

export function getCommemorativeDatesForYear(year,data=days) {
  const result={};
  for(const day of data){
    const monthIndex= new Date(`${day.monthName} 1, ${year}`).getMonth() +1;
    const date=getDates(year,monthIndex,day.dayName,day.occurrence);

    if(date){
      const key=`${year}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`
      result[key]=day.name;
   }
 }
 return result;
}
 
