import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { task } from "../../Common/task";
import PieChart from "../component/PieChart";
import { MemberStatistics } from "../screens/Tasks/memberStatistics";
import SmallPieChart from "./SmallPieChart";

interface Props {
    data: MemberStatistics[];
    tasks: task[];
}

const StatisticsCharts: FC<Props> = ({ data, tasks }): React.ReactElement => {
    const allDoneTaskIds: string[] = [];
    const allDoneTaskNames: string[] = [];

    tasks ? console.log("tasksData exists3") : console.log("Not exist3")


    const getUniqueDoneTaskIds = () => {
        data.forEach((member) => {
            member.doneTasks.forEach((doneTask) => {
                let taskName: string;
                if (!allDoneTaskIds.includes(doneTask.taskId)) {
                    allDoneTaskIds.push(doneTask.taskId);

                    getUniqueDoneTaskName(doneTask.taskId)

                    // if (getUniqueDoneTaskName(doneTask.taskId) !== undefined) {
                    //     allDoneTaskNames.push(getUniqueDoneTaskName(doneTask.taskId)!.name);
                    // } else {
                    //     allDoneTaskNames.push("Unnamed task");
                    // }
                }
            });
        });
    };

    const getUniqueDoneTaskName = (taskId: string) => {
        for (let i = 0; i < tasks.length; i++) {
            if(tasks[i] === undefined) console.log("UNDEEFINED TAKS")
            else console.log("TASK EXISTS: " + tasks[i].id)
        }

        // tasks.forEach((task) => {
        //     if (task.id) console.log("JA PÅ:" + taskId)
        //     else console.log("NEJ PÅ " + taskId)
            // task.id === taskId
        // })
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
                    console.log("ADDED PARTICIPANT MEMBER: " + member.userId); //TEEEEEEEEEEEEST
                    return;
                }
            });
        });
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
        return allDoneTaskIds.map((taskId, index) => {
            return (
                <SmallPieChart
                    data={filterOutNonparticipantMembers(data, taskId)}
                    specificTaskId={taskId}
                    key={index}
                    style={[styles.smallChartSize]}
                    taskName="abc"
                />
            );
        });
    };

    getUniqueDoneTaskIds();
    return (
        <>
            <PieChart data={data} taskName="Totalt" />
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
