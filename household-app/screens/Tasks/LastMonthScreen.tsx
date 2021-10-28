/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { doneTask } from "../../../Common/doneTask";
import StatisticsCharts from "../../component/StatisticsCharts";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { useGetDoneTasksWithHouseholdIdQuery } from "../../Redux/Service/doneTask/doneTaskApi";
import { useGetTaskByHouseholdIdQuery } from "../../Redux/Service/task/taskApi";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { getLastMonthDoneTasksByHousehold } from "./doneTaskHelper";
import { createMemberStatistics, MemberStatistics } from "./MemberStatistics";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const LastMonthScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const { data: doneTasksArray, error: doneTaskError } = useGetDoneTasksWithHouseholdIdQuery(currentHousehold?.id!);
    const { data: tasksDataArray, error: taskError } = useGetTaskByHouseholdIdQuery(currentHousehold?.id!);

    const haveAllDoneTasksValue = (doneTasksArray: doneTask[]) => {
        let returnValue = true;

        doneTasksArray.forEach((doneTask) => {
            console.log("CHECK FOR DONETASK, VALUE" + doneTask.value) //TEST
            if (!doneTask.value || doneTask.value === undefined) returnValue = false;
        });
        return returnValue;
    };

    let statisticsArray: MemberStatistics[] | undefined = undefined;
    let fillerMessage = "No done tasks found for this household.";

    if (doneTasksArray !== undefined && doneTasksArray.length > 0 && currentHousehold !== undefined) {
        let doneTasksOfLastMonth = getLastMonthDoneTasksByHousehold(doneTasksArray, currentHousehold);

        console.log("ALLA ODNETASKS OF LAST MONTH")
        console.log(doneTasksOfLastMonth)

        // if (!haveAllDoneTasksValue(doneTasksOfLastMonth)) {
        //     console.log("---------------------------------DATAs VALUE check") //TEST
        //     doneTasksOfLastMonth = fillAllMissingTaskValues(doneTasksOfLastMonth, tasksDataArray!);
        // }

        if (doneTasksOfLastMonth.length === 0) {
            fillerMessage = "No data found for the selected period.";
        } else {
            console.log("check, doneTaskOfLastMonth array length: " + doneTasksOfLastMonth.length); //TEST
            statisticsArray = createMemberStatistics(doneTasksOfLastMonth, currentHousehold);
            console.log("statisticsArray after creation run: " + statisticsArray.length); //TEST
        }
    }

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
