/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import StatisticsCharts from "../../../component/piecharts/StatisticsCharts";
import { selectSelectedHousehold } from "../../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../../Redux/hooks";
import { useLazyGetHouseholdByIdQuery } from "../../../Redux/Service/household/householdApi";
import { useLazyGetDoneTasksWithHouseholdIdQuery } from "../../../Redux/Service/task/taskApi";
import { FeedStackScreenProps, MainRoutes } from "../../../routes/routes";
import { getCalendarWeekDoneTasksByHousehold } from "../helpers/doneTaskHelper";
import { createMemberStatistics, MemberStatistics } from "../helpers/MemberStatistics";
import styles from "./styles";

type Props = FeedStackScreenProps<MainRoutes.CurrentWeekScreen>;

const CurrentWeekScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const getId = useAppSelector(selectSelectedHousehold);
    const [loadHouseholdData, householdResult] = useLazyGetHouseholdByIdQuery();
    const { data: currentHousehold, error: householdError } = householdResult;
    const [loadDoneTaskData, doneTaskResult] = useLazyGetDoneTasksWithHouseholdIdQuery();
    const { data: doneTasksArray, error: doneTaskError } = doneTaskResult;

    const [statisticsArray, setStatisticsArray] = useState<MemberStatistics[]>();
    const [fillerMessage, setFillerMessage] = useState("No done tasks found for this household.");

    useEffect(() => {
        if (!getId) return;
        loadHouseholdData(getId.id);
    }, []);

    useEffect(() => {
        if (!currentHousehold) return;
        loadDoneTaskData(currentHousehold.id);
    }, [currentHousehold]);

    useEffect(() => {
        if (doneTasksArray && doneTasksArray?.length > 0 && currentHousehold) {
            const doneTasksOfLastWeek = getCalendarWeekDoneTasksByHousehold(doneTasksArray, currentHousehold, 0);
            if (doneTasksOfLastWeek.length === 0) {
                setFillerMessage("No data found for the selected period.");
            } else {
                setStatisticsArray(createMemberStatistics(doneTasksOfLastWeek, currentHousehold));
            }
        }
    }, [currentHousehold, doneTasksArray]);

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

export default CurrentWeekScreen;
