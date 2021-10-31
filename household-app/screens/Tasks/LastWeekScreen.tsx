/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import StatisticsCharts from "../../component/piecharts/StatisticsCharts";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { useGetDoneTasksWithHouseholdIdQuery } from "../../Redux/Service/doneTask/doneTaskApi";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { getCalendarWeekDoneTasksByHousehold } from "./doneTaskHelper";
import { createMemberStatistics, MemberStatistics } from "./MemberStatistics";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const LastWeekScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const { data: doneTasksArray, error: doneTaskError } = useGetDoneTasksWithHouseholdIdQuery(currentHousehold?.id!);

    let statisticsArray: MemberStatistics[] | undefined = undefined;
    let fillerMessage = "No done tasks found for this household.";

    // console.log("DONETASKARRAY ANTAL: " + doneTasksArray.length) //TEST

    if (doneTasksArray !== undefined && doneTasksArray.length > 0 && currentHousehold !== undefined) {
        const doneTasksOfLastWeek = getCalendarWeekDoneTasksByHousehold(doneTasksArray, currentHousehold, 1);
        console.log("DONETASKARRAY ANTAL: " + doneTasksOfLastWeek.length) //TEST
        // const x = 4; //TEST
        // console.log("MÅNDAG FÖR " + x + " VECKA SEN VAR " + getCalendarWeekStartInSeconds(x))
        // console.log("SÖNDAG FÖR " + x + " VECKA SEN VAR " + getCalendarWeekEndInSeconds(x))

        if (doneTasksOfLastWeek.length === 0) {
            fillerMessage = "No data found for the selected period.";
        } else {
            statisticsArray = createMemberStatistics(doneTasksOfLastWeek, currentHousehold);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {statisticsArray && currentHousehold ? (
                    <StatisticsCharts data={statisticsArray} currentHousehold={currentHousehold} />
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.text}>{fillerMessage}</Text>
                    </View>
                )}
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
