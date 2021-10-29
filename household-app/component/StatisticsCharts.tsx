/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { doneTask } from "../../Common/doneTask";
import { household } from "../../Common/household";
import { task } from "../../Common/task";
import PieChart from "../component/PieChart";
import { useGetTaskByHouseholdIdQuery } from "../Redux/Service/task/taskApi";
import { MemberStatistics } from "../screens/Tasks/memberStatistics";
import SmallPieChart from "./SmallPieChart";

interface Props {
    data: MemberStatistics[];
    currentHousehold: household;
}

const StatisticsCharts: FC<Props> = ({ data, currentHousehold }): React.ReactElement => {
    const relevantTaskIds: string[] = [];
    const relevantTaskNames: string[] = [];
    const filteredTaskArray: task[] = [];
    const { data: tasksData, isLoading, isSuccess } = useGetTaskByHouseholdIdQuery(currentHousehold?.id);

    useEffect(() => {
        if (tasksData && isSuccess) {
            tasksData.forEach((task) => {
                if (task.houseHoldId === currentHousehold.id) filteredTaskArray.push(task);
            });
        }
    }, [tasksData]);

    /**
     * Function loops through every submitted MemberStatistic and adds only
     * ids of unique tasks and corresponding task.Name values to a tuple array.
     */
    const getUniqueDoneTaskIds = () => {
        data.forEach((member) => {
            member.doneTasks.forEach((doneTask) => {
                if (relevantTaskIds.includes(doneTask.taskId)) return;
                else pushNewIdAndName(doneTask);
            });
        });
    };

    const pushNewIdAndName = (doneTask: doneTask) => {
        let taskName = tasksData?.find((task) => task.id === doneTask.taskId)?.name;
        if (taskName === undefined) taskName = "Unnamed task";
        relevantTaskIds.push(doneTask.taskId);
        relevantTaskNames.push(taskName);
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
        return relevantTaskIds.map((taskId, index) => {
            return (
                <SmallPieChart
                    data={filterOutNonparticipantMembers(data, taskId)}
                    specificTaskId={taskId}
                    key={index}
                    style={[styles.smallChartSize]}
                    taskName={relevantTaskNames[index]}
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
