/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
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
    console.log("------------------NEW RENDITION -------------------"); //TEEEEEEEEEEEEEEEEEEEEEEEEEEEEST

    const [allDownloadsComplete, setAllDownloadsComplete] = useState(false);

    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const { data: tasksData, isLoading } = useGetTaskByHouseholdIdQuery(currentHousehold?.id!);
    const { data: doneTasksArray, error: doneTaskError } = useGetDoneTasksWithHouseholdIdQuery(currentHousehold?.id!);

    tasksData ? console.log("tasksData exists") : console.log("Not exist")

    let statisticsArray: MemberStatistics[] | undefined = undefined;
    let fillerMessage = "No done tasks found for this household.";

    if (doneTasksArray !== undefined && doneTasksArray.length > 0 && currentHousehold !== undefined) {
        const doneTasksOfLastMonth = getLastMonthDoneTasksByHousehold(doneTasksArray, currentHousehold);

        console.log("ALLA DONETASKS OF LAST MONTH"); //TEEEEEEEEEEEEEEEEEEEEEEEEEEEEST
        console.log(doneTasksOfLastMonth);

        if (doneTasksOfLastMonth.length === 0) {
            fillerMessage = "No data found for the selected period.";
        } else {
            console.log("check, doneTaskOfLastMonth array length: " + doneTasksOfLastMonth.length); //TEST
            statisticsArray = createMemberStatistics(doneTasksOfLastMonth, currentHousehold);
            console.log("statisticsArray after creation run: " + statisticsArray.length); //TEST
        }
    }

    //RUBRIKER UNDER VARJE DIAGRAM!!!!!!!!!!!
    // RUBRIKER UNDER VARJE DIAGRAM ÄVEN DET STORA DIAGRAMMET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    tasksData ? console.log("tasksData exists2") : console.log("Not exist2")

    useEffect(() => {
        if (tasksData !== undefined && doneTasksArray) setAllDownloadsComplete(true);
    }, [tasksData, doneTasksArray]);

    return (
        <SafeAreaView>
            <ScrollView>
                {statisticsArray && allDownloadsComplete ? (
                    <StatisticsCharts data={statisticsArray} tasks={tasksData!} />
                ) : (
                    <Text>{fillerMessage}</Text>
                )}
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
