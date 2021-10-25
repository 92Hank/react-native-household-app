import React, { FC } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import doneTask from "../../../Common(obsolete)/doneTask";
import StatisticsCharts from "../../component/StatisticsCharts";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { MemberStatistics } from "./memberStatistics";
import { useGetDoneTasksWithHouseholdIdQuery } from "../../Redux/Service/doneTask/doneTaskApi";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { useGetTaskByHouseholdIdQuery } from "../../Redux/Service/task/taskApi";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const LastMonthScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const dagensDatum = new Date(1995, 11, 17);

    const currentHousehold = useAppSelector(selectSelectedHousehold);
    console.log("HOUSEHOLD ID ÄR:" + currentHousehold!.id!);

    const doneTasks = useGetDoneTasksWithHouseholdIdQuery(currentHousehold!.id!).data; //ange if för finns ej sen? eller tas via 0 diagram?

    // const tasks = useGetTaskByHouseholdIdQuery(currentHousehold!.id!).data;

    doneTasks!.forEach((task) => {
        console.log(task);
    });

    // tasks!.forEach((task) => {
    //     console.log(task);
    // });

    // const getLastMonthDates = () => {
    //     const lastMonthDate = new Date();
    //     const lastOfLastMonth = lastMonthDate.setDate(0);
    //     const firstOfLastMonth = lastMonthDate.setDate(1);
    //     return [firstOfLastMonth, lastOfLastMonth];
    // };

    //1. hämta householdId
    //2. hämta doneTasks per householdId
    //3. sortera på datumintervall




    const testTasksDone: doneTask[] = [
        {
            id: "1",
            taskId: "1",
            memberId: [1, 2, 3],
            dateDone: dagensDatum,
            value: 2,
        },
        {
            id: "2",
            taskId: "2",
            memberId: [2, 3],
            dateDone: dagensDatum,
            value: 2,
        },
        {
            id: "3",
            taskId: "3",
            memberId: [2, 3],
            dateDone: dagensDatum,
            value: 2,
        },
        {
            id: "4",
            taskId: "4",
            memberId: [4],
            dateDone: dagensDatum,
            value: 10,
        },
        {
            id: "5",
            taskId: "5",
            memberId: [4, 1],
            dateDone: dagensDatum,
            value: 10,
        },
    ];

    const data: MemberStatistics[] = [
        {
            //DETTA ÄR EN USER
            key: 1,
            userId: "1",
            emoji: "🐙",
            doneTasks: [testTasksDone[0]], //0
            svg: {
                fill: "#600080",
                onPress: () => console.log("USER1"),
            },
        },
        {
            //DETTA ÄR EN USER
            key: 2,
            userId: "2",
            emoji: "🦊",
            doneTasks: [testTasksDone[1], testTasksDone[2], testTasksDone[4]], //2+2=4
            svg: {
                fill: "green",
                onPress: () => console.log("USER2"),
            },
        },
        {
            //DETTA ÄR EN USER
            key: 3,
            userId: "3",
            emoji: "🐸",
            doneTasks: [testTasksDone[1], testTasksDone[2]], //2+2=4
            svg: {
                fill: "blue",
                onPress: () => console.log("USER3"),
            },
        },
        {
            //DETTA ÄR EN USER
            key: 4,
            userId: "999", //4
            emoji: "🦄",
            doneTasks: [testTasksDone[3], testTasksDone[4]],
            svg: {
                fill: "red",
                onPress: () => console.log("USER4"),
            },
        },
    ];

    return (
        <SafeAreaView>
            <ScrollView>
                <StatisticsCharts data={data} />
            </ScrollView>
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
