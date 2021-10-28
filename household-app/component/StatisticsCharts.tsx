import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import PieChart from "../component/PieChart";
import { MemberStatistics } from "../screens/Tasks/memberStatistics";
import SmallPieChart from "./SmallPieChart";

interface Props {
    data: MemberStatistics[];
}

const StatisticsCharts: FC<Props> = ({ data }): React.ReactElement => {
    const allDoneTaskIdsArray: string[] = [];

    const getUniqueDoneTaskIds = () => {
        data.forEach((member) => {
            member.doneTasks.forEach((doneTask) => {
                if (!allDoneTaskIdsArray.includes(doneTask.taskId)) allDoneTaskIdsArray.push(doneTask.taskId);
                console.log(member.emoji + "task value:" + (doneTask.value as number)) //TEST
            });
        });
    };

    /**
     * Function to filter out from the MemberStatistics data array all members not
     * included in a particular task, defined as not having the taskId in their
     * doneTasks[] parameter.
     *
     * The filtered data can be used to determine the amount of slices of a piechart.
     *
     * @param data
     * @param taskId
     * @returns {MemberStatistics[]}
     */
    const filterOutNonparticipantMembers = (data: MemberStatistics[], taskId: string) => {
        const filteredMembers: MemberStatistics[] = [];
        data.forEach((member) => {
            member.doneTasks.forEach((doneTask) => {
                if (!filteredMembers.includes(member) && doneTask.taskId === taskId) {
                    filteredMembers.push(member);
                    console.log("Added user " + member.userId) //TEST
                    console.log("Added user has MemberStatistics[] key" + member.key) //TEST HÄR LIGGER FELET, DUBBELT TILLAGDA!!
                    return;
                }
            });
        });
        console.log("------- ABOVE SENT TO ONE SMALL PIE") //ETST
        return filteredMembers;
    };

    /**
     * Function to loop through the array of all unique doneTask.taskId values and
     * based on them create an array of piechart components. Make sure the taskId
     * values corresponds precisely to each intended task/doneTask object.
     *
     * @returns {JSX.Element[]}
     */
    const generateSmallPieCharts = () => {
        return allDoneTaskIdsArray.map((taskId, index) => {
            console.log("taskID small piechart: " + taskId) //TEST
            console.log("index of smallpicechart: " + index)
            return (
                <SmallPieChart
                    data={filterOutNonparticipantMembers(data, taskId)}
                    specificTaskId={taskId}
                    key={index}
                    style={[styles.smallChartSize]}
                />
            );
        });
    };

    getUniqueDoneTaskIds();
    return (
        <>
            <PieChart data={data} />
            <View style={[styles.smallChartView]}>{generateSmallPieCharts()}</View>
        </>
    );
};

export default StatisticsCharts;

const styles = StyleSheet.create({
    smallChartView: {
        display: "flex",
        flexGrow: 1,
        flexShrink: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
        justifyContent: "space-evenly",
    },
    smallChartSize: {
        display: "flex",
        flex: 1,
        height: 125,
        flexBasis: "30%",
        margin: 0,
        padding: 0,
    },
});
