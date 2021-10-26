import { doneTask } from "../../../Common/doneTask";
import { household } from "../../../Common/household";

export const filterDoneTasksByHouseHold = (doneTasksArray: doneTask[], currentHousehold: household) => {
    return doneTasksArray.filter((doneTask) => doneTask.householdId === currentHousehold.id);
};

export const getLastMonthStartInSeconds = () => {
    const lastMonthStartDate = new Date();
    lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);
    lastMonthStartDate.setDate(1);
    lastMonthStartDate.setHours(0, 0, 0, 0);
    return Math.floor(lastMonthStartDate.getTime() / 1000);
};

export const getLastMonthEndInSeconds = () => {
    const lastMonthEndDate = new Date();
    lastMonthEndDate.setMonth(lastMonthEndDate.getMonth());
    lastMonthEndDate.setDate(0);
    lastMonthEndDate.setHours(23, 59, 59, 999);
    return Math.floor(lastMonthEndDate.getTime() / 1000);
};

export const filterDoneTasksBySecondsInterval = (
    doneTasksArray: doneTask[],
    startDateInSeconds: number,
    endDateInSeconds: number,
) => {
    return doneTasksArray.filter((doneTask) => {
        const dateDoneInSeconds = doneTask.dateDone?.getTime() * 1000;

        if (dateDoneInSeconds - endDateInSeconds <= 0 && dateDoneInSeconds - startDateInSeconds >= 0) return doneTask;
    });
};
