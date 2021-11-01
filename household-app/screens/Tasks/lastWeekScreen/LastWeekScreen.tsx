/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import StatisticsCharts from "../../../component/piecharts/StatisticsCharts";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { useGetDoneTasksWithHouseholdIdQuery } from "../../../Redux/Service/doneTask/doneTaskApi";
import { FeedStackScreenProps, MainRoutes } from "../../../routes/routes";
import { getCalendarWeekDoneTasksByHousehold } from "../helpers/doneTaskHelper";
import { createMemberStatistics, MemberStatistics } from "../helpers/MemberStatistics";
import styles from "./styles";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const LastWeekScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const { data: doneTasksArray, error: doneTaskError } = useGetDoneTasksWithHouseholdIdQuery(currentHousehold?.id!);

    let statisticsArray: MemberStatistics[] | undefined = undefined;
    let fillerMessage = "No done tasks found for this household.";

    if (doneTasksArray !== undefined && doneTasksArray.length > 0 && currentHousehold !== undefined) {
        const doneTasksOfLastWeek = getCalendarWeekDoneTasksByHousehold(doneTasksArray, currentHousehold, 1);
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
