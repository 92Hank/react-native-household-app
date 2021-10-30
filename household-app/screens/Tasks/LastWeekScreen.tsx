import React, { FC } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { doneTask } from "../../../Common/doneTask";
import StatisticsCharts from "../../component/piecharts/StatisticsCharts";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { MemberStatistics } from "./memberStatistics";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const LastWeekScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const dagensDatum = new Date(1995, 11, 17);

    // const testTasksDone: doneTask[] = [
    //     {
    //         id: "1",
    //         taskId: "101",
    //         memberId: "5",
    //         dateDone: dagensDatum,
    //         value: 2,
    //     },
    //     {
    //         id: "2",
    //         taskId: "102",
    //         memberId: "8",
    //         dateDone: dagensDatum,
    //         value: 2,
    //     },
    //     {
    //         id: "3",
    //         taskId: "103",
    //         memberId: "2",
    //         dateDone: dagensDatum,
    //         value: 2,
    //     },
    //     {
    //         id: "4",
    //         taskId: "500",
    //         memberId: "4",
    //         dateDone: dagensDatum,
    //         value: 8,
    //     },
    // ];

    // const data: MemberStatistics[] = [
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
    //         doneTasks: [testTasksDone[1], testTasksDone[2]], //2+2=4
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
    //         doneTasks: [testTasksDone[3]],
    //         svg: {
    //             fill: "red",
    //             onPress: () => console.log("USER4"),
    //         },
    //     },
    // ];

    return (
        <SafeAreaView>
            <ScrollView>
                {/* <StatisticsCharts data={data} /> */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default LastWeekScreen;

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
