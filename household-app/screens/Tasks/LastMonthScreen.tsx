/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import StatisticsCharts from "../../component/StatisticsCharts";
import { selectCurrentLoginUser } from "../../Redux/features/loginUser/LoginSelectors";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { useGetDoneTasksWithHouseholdIdQuery } from "../../Redux/Service/doneTask/doneTaskApi";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { getLastMonthDoneTasksByHousehold } from "./doneTaskHelper";
import { createMemberStatistics, MemberStatistics } from "./MemberStatistics";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const LastMonthScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    console.log("------------------------------- NEW RENDITION"); //TEST
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const currentuser = useAppSelector(selectCurrentLoginUser); //TEST
    console.log("HOUSEHOLD ID ÄR:   " + currentHousehold!.id!); //TEST
    // console.log("user ID ÄR:   " + currentuser!.id!); //TEST

    const { data: doneTasksArray, isSuccess, error } = useGetDoneTasksWithHouseholdIdQuery(currentHousehold?.id!);

    // console.log("LÄNGD AV DONETASK ARRAY:  " + doneTasksArray!.length) //TEST

    let statisticsArray: MemberStatistics[] | undefined = undefined;
    let fillerMessage = "No done tasks found for this household.";

    if (doneTasksArray !== undefined && doneTasksArray.length > 0 && currentHousehold !== undefined) {
        const doneTasksOfLastMonth = getLastMonthDoneTasksByHousehold(doneTasksArray, currentHousehold);

        if (doneTasksOfLastMonth.length === 0) {
            fillerMessage = "No data found for the selected period.";
        } else {
            console.log("check, doneTaskOfLastMonth array length: " + doneTasksOfLastMonth.length)//TEST
            statisticsArray = createMemberStatistics(doneTasksOfLastMonth, currentHousehold);
            console.log("statisticsArray after creation run: " + statisticsArray.length) //TEST
            console.log("statistic 0 doneTask length after creation run: " + statisticsArray[0].doneTasks.length) //TEST
            console.log("statistic 1 doneTask length after creation run: " + statisticsArray[1].doneTasks.length) //TEST
        }
    }

    //TEST
    let indexI = 0;
    statisticsArray?.forEach((member) => {
        console.log("member" + indexI++ + "doneTask length:   ___ " + member.doneTasks.length)
    });

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
            <ScrollView>
                {statisticsArray ? <StatisticsCharts data={statisticsArray} /> : <Text>{fillerMessage}</Text>}
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
