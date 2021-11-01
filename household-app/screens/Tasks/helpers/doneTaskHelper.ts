import { doneTask } from "../../../../Common/doneTask";
import { household } from "../../../../Common/household";

/**
 * doneTask objects are assigned a Timestamp object to doneDate property.
 * It is typed here for calculation purposes.
 */
type Timestamp = {
    _seconds: number;
    _nanoseconds: number;
};

/**
 * Function takes an array of doneTask objects and household object, and based on them
 * returns a filtered array of doneTask objects created during the last month for the
 * same household. If doneTask.value is undefined, it is excluded.
 *
 * @param doneTasksArray
 * @param currentHousehold
 * @returns
 */
export const getLastMonthDoneTasksByHousehold = (doneTasksArray: doneTask[], currentHousehold: household) => {
    let filteredArray = filterDoneTasksByHouseHold(doneTasksArray, currentHousehold.id);
    filteredArray = filterDoneTasksByValueProperty(doneTasksArray);
    const startTime = getLastMonthStartInSeconds();
    const endTime = getLastMonthEndInSeconds();
    return filterDoneTasksBySecondsInterval(filteredArray, startTime, endTime);
};

/**
 * Function takes an array of doneTask objects, household object and number of weeks back,
 * and returns a filtered array of doneTask objects created during the selected week for
 * the same household. If doneTask.value is undefined, it is excluded.
 *
 * @param doneTasksArray
 * @param currentHousehold
 * @param weeksBack
 * @returns
 */
export const getCalendarWeekDoneTasksByHousehold = (
    doneTasksArray: doneTask[],
    currentHousehold: household,
    weeksBack: number,
) => {
    let filteredArray = filterDoneTasksByHouseHold(doneTasksArray, currentHousehold.id);
    filteredArray = filterDoneTasksByValueProperty(doneTasksArray);
    const startTime = getCalendarWeekStartInSeconds(weeksBack);
    const endTime = getCalendarWeekEndInSeconds(weeksBack);
    return filterDoneTasksBySecondsInterval(filteredArray, startTime, endTime);
};

const filterDoneTasksByHouseHold = (doneTasksArray: doneTask[], currentHouseholdId: string) => {
    return doneTasksArray.filter((doneTask) => doneTask.houseHoldId === currentHouseholdId);
};

const filterDoneTasksBySecondsInterval = (
    doneTasksArray: doneTask[],
    startDateInSeconds: number,
    endDateInSeconds: number,
) => {
    return doneTasksArray.filter((doneTask) => {
        const timeStamp = doneTask.dateDone as unknown as Timestamp;
        const dateDoneInSeconds = timeStamp._seconds;
        if (endDateInSeconds - dateDoneInSeconds >= 0 && startDateInSeconds - dateDoneInSeconds <= 0) return doneTask;
    });
};

const filterDoneTasksByValueProperty = (doneTasksArray: doneTask[]) => {
    return doneTasksArray.filter((doneTask) => doneTask.value);
};

const getLastMonthStartInSeconds = () => {
    const lastMonthStartDate = new Date();
    lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1, 1);
    lastMonthStartDate.setDate(1);
    lastMonthStartDate.setHours(0, 0, 0, 0);
    return Math.floor(lastMonthStartDate.getTime() / 1000);
};

const getLastMonthEndInSeconds = () => {
    const lastMonthEndDate = new Date();
    lastMonthEndDate.setMonth(lastMonthEndDate.getMonth());
    lastMonthEndDate.setDate(0);
    lastMonthEndDate.setHours(23, 59, 59, 999);
    return Math.floor(lastMonthEndDate.getTime() / 1000);
};

/**
 * Function to return start of selected calendar week in seconds
 * from Unix epoch time start. First day of the week is Monday.
 *
 * Input value is number of weeks back from current week with
 * a parameter input of 0 meaning the current week.
 *
 * @param weeksBack
 */
const getCalendarWeekStartInSeconds = (weeksBack: number) => {
    const weekStartDate = new Date();

    if (weekStartDate.getDay() === 1) {
        weekStartDate.setDate(weekStartDate.getDate() - 7 * weeksBack);
    } else {
        weekStartDate.setDate(weekStartDate.getDate() - ((weekStartDate.getDay() + 6) % 7) - 7 * weeksBack);
    }

    weekStartDate.setHours(0, 0, 0, 0);
    return Math.floor(weekStartDate.getTime() / 1000);
};

/**
 * Function to return end of selected calendar week in seconds
 * from Unix epoch time start. Last day of the week is Sunday.
 *
 * Input value is number of weeks back from current week with
 * a parameter input of 0 meaning the current week.
 *
 * @param weeksBack
 */
const getCalendarWeekEndInSeconds = (weeksBack: number) => {
    const weekEndDate = new Date();

    if (weekEndDate.getDay() === 0) {
        weekEndDate.setDate(weekEndDate.getDate() - 7 * weeksBack);
    } else if (weeksBack === 0 && weekEndDate.getDay() !== 0) {
        const firstDayOfWeek = weekEndDate.getDate() - weekEndDate.getDay();
        weekEndDate.setDate(firstDayOfWeek + 6);
    } else {
        weekEndDate.setDate(weekEndDate.getDate() - weekEndDate.getDay() + 6 - 7 * weeksBack);
    }

    weekEndDate.setHours(23, 59, 59, 999);
    return Math.floor(weekEndDate.getTime() / 1000);
};
