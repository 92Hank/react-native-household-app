/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import StatisticsCharts from "../../component/StatisticsCharts";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { useGetDoneTasksWithHouseholdIdQuery } from "../../Redux/Service/doneTask/doneTaskApi";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { getLastMonthDoneTasksByHousehold } from "./doneTaskHelper";
import { createMemberStatistics, MemberStatistics } from "./MemberStatistics";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const LastMonthScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const { data: doneTasksArray, error: doneTaskError } = useGetDoneTasksWithHouseholdIdQuery(currentHousehold?.id!);

    let statisticsArray: MemberStatistics[] | undefined = undefined;
    let fillerMessage = "No done tasks found for this household.";

    if (doneTasksArray !== undefined && doneTasksArray.length > 0 && currentHousehold !== undefined) {
        const doneTasksOfLastMonth = getLastMonthDoneTasksByHousehold(doneTasksArray, currentHousehold);

        console.log("ALLA ODNETASKS OF LAST MONTH") //TEST
        console.log(doneTasksOfLastMonth)

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
