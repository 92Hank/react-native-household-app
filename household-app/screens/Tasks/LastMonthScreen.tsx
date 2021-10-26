/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import StatisticsCharts from "../../component/StatisticsCharts";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { MemberStatistics } from "./memberStatistics";
import { useGetDoneTasksWithHouseholdIdQuery } from "../../Redux/Service/doneTask/doneTaskApi";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import doneTask from "../../Redux/entity/doneTask";
import { useGetTaskByHouseholdIdQuery } from "../../Redux/Service/task/taskApi";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

type Timestamp = {
    _seconds: number;
    _nanoseconds: number;
};

const LastMonthScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const dagensDatum = new Date(1995, 11, 17);
    console.log("------------------------------- NEW RENDITION"); //TEST
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    console.log("HOUSEHOLD ID ÄR:   " + currentHousehold!.id!); //TEST

    const { data: doneTasksArray, isSuccess, error } = useGetDoneTasksWithHouseholdIdQuery(currentHousehold?.id!);
    // console.log("KLARA TASKAR", doneTasksArray); //TEST

    doneTasksArray?.forEach((task) => {
        //TEST
        console.log("doneTask hushålls-id" + task.houseHoldId);
    });

    const filterDoneTasksByHouseHold = (doneTasksArray: doneTask[]) => {
        return doneTasksArray.filter((doneTask) => doneTask.houseHoldId === currentHousehold!.id!);
    };

    const getLastMonthStartDate = () => {
        const lastMonthStartDate = new Date();
        lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);
        lastMonthStartDate.setDate(1);
        lastMonthStartDate.setHours(0, 0, 0, 0);
        return lastMonthStartDate;
    };

    const getLastMonthEndDate = () => {
        const lastMonthEndDate = new Date();
        lastMonthEndDate.setMonth(lastMonthEndDate.getMonth());
        lastMonthEndDate.setDate(0);
        lastMonthEndDate.setHours(23, 59, 59, 59);
        return lastMonthEndDate;
    };

    const filterDoneTasksByDateInterval = (doneTasksArray: doneTask[], startDate: Date, endDate: Date) => {
        //ta in Timestamp typ variabel, tilldela värdet av dateDone.
        //konvertera till datum Date-typ.
        //anvönd nedan.

        



        return doneTasksArray.filter((doneTask) => {
            if (
                doneTask.dateDone!.getTime() - endDate.getTime() <= 0 &&
                doneTask.dateDone!.getTime() - startDate.getTime() > 0
            )
                return doneTask;
        });
    };

    console.log("STARTDATUM ÄR   " + getLastMonthStartDate() + "\n"); //TEST
    console.log("SLUTDATUM ÄR   " + getLastMonthEndDate() + "\n"); //TEST

    //1. hämta householdId
    //2. hämta doneTasks per householdId
    // OBS sortera på id med
    //3. sortera på datumintervall

    // const testTasksDone: doneTask[] = [
    //     {
    //         id: "1",
    //         taskId: "1",
    //         memberId: [1, 2, 3],
    //         dateDone: dagensDatum,
    //         value: 2,
    //     },
    //     {
    //         id: "2",
    //         taskId: "2",
    //         memberId: [2, 3],
    //         dateDone: dagensDatum,
    //         value: 2,
    //     },
    //     {
    //         id: "3",
    //         taskId: "3",
    //         memberId: [2, 3],
    //         dateDone: dagensDatum,
    //         value: 2,
    //     },
    //     {
    //         id: "4",
    //         taskId: "4",
    //         memberId: [4],
    //         dateDone: dagensDatum,
    //         value: 10,
    //     },
    //     {
    //         id: "5",
    //         taskId: "5",
    //         memberId: [4, 1],
    //         dateDone: dagensDatum,
    //         value: 10,
    //     },
    // ];

    // const dataArray: MemberStatistics[] = [
    //     {
    //         //DETTA ÄR EN USER
    //         key: 1,
    //         userId: "1",
    //         emoji: "🐙",
    //         doneTasks: [testTasksDone[0]], //0
    //         svg: {
    //             fill: "#600080",
    //             onPress: () => console.log("USER1"),
    //         },
    //     },
    //     {
    //         //DETTA ÄR EN USER
    //         key: 2,
    //         userId: "2",
    //         emoji: "🦊",
    //         doneTasks: [testTasksDone[1], testTasksDone[2], testTasksDone[4]], //2+2=4
    //         svg: {
    //             fill: "green",
    //             onPress: () => console.log("USER2"),
    //         },
    //     },
    //     {
    //         //DETTA ÄR EN USER
    //         key: 3,
    //         userId: "3",
    //         emoji: "🐸",
    //         doneTasks: [testTasksDone[1], testTasksDone[2]], //2+2=4
    //         svg: {
    //             fill: "blue",
    //             onPress: () => console.log("USER3"),
    //         },
    //     },
    //     {
    //         //DETTA ÄR EN USER
    //         key: 4,
    //         userId: "999", //4
    //         emoji: "🦄",
    //         doneTasks: [testTasksDone[3], testTasksDone[4]],
    //         svg: {
    //             fill: "red",
    //             onPress: () => console.log("USER4"),
    //         },
    //     },
    // ];

    return (
        <SafeAreaView>
            <ScrollView>{/* <StatisticsCharts data={dataArray} /> */}</ScrollView>
        </SafeAreaView>
    );
};

export default LastMonthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "grey",
    },
});
