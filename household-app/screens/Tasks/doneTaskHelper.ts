import { doneTask } from "../../../Common/doneTask";
import { household } from "../../../Common/household";

type Timestamp = {
    _seconds: number;
    _nanoseconds: number;
};

/**
 * Function takes an array of doneTask objects and household object, and based on them
 * returns a filtered array of doneTask objects created during the last month for the
 * same household.
 *
 * @param doneTasksArray
 * @param currentHousehold
 * @returns
 */
export const getLastMonthDoneTasksByHousehold = (doneTasksArray: doneTask[], currentHousehold: household) => {
    const filteredArray = filterDoneTasksByHouseHold(doneTasksArray, currentHousehold.id);
    const startTime = getLastMonthStartInSeconds();
    const endTime = getLastMonthEndInSeconds();

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

        const dateDoneInSeconds = timeStamp._seconds * 1000;
        if (dateDoneInSeconds - endDateInSeconds <= 0 && dateDoneInSeconds - startDateInSeconds >= 0) return doneTask;
    });
};

const getLastMonthStartInSeconds = () => {
    const lastMonthStartDate = new Date();
    lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);
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
