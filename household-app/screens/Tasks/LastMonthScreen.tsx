/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import StatisticsCharts from "../../component/StatisticsCharts";
import { selectSelectedHousehold } from "../../Redux/features/SelectedState/SelectedStateSelectors";
import { useAppSelector } from "../../Redux/hooks";
import { useGetDoneTasksWithHouseholdIdQuery } from "../../Redux/Service/doneTask/doneTaskApi";
import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { getLastMonthDoneTasksByHousehold } from "./doneTaskHelper";
import { createMemberStatistics, MemberStatistics } from "./MemberStatistics";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const LastMonthScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    console.log("------------------NEW RENDITION -------------------"); //TEEEEEEEEEEEEEEEEEEEEEEEEEEEEST
    const currentHousehold = useAppSelector(selectSelectedHousehold);
    const { data: doneTasksArray, error: doneTaskError } = useGetDoneTasksWithHouseholdIdQuery(currentHousehold?.id!);

    let statisticsArray: MemberStatistics[] | undefined = undefined;
    let fillerMessage = "No done tasks found for this household.";

    if (doneTasksArray !== undefined && doneTasksArray.length > 0 && currentHousehold !== undefined) {
        const doneTasksOfLastMonth = getLastMonthDoneTasksByHousehold(doneTasksArray, currentHousehold);

        console.log("ALLA DONETASKS OF LAST MONTH"); //TEEEEEEEEEEEEEEEEEEEEEEEEEEEEST
        console.log(doneTasksOfLastMonth); //TEST

        if (doneTasksOfLastMonth.length === 0) {
            fillerMessage = "No data found for the selected period.";
        } else {
            statisticsArray = createMemberStatistics(doneTasksOfLastMonth, currentHousehold);
        }
    }

    //RUBRIKER UNDER VARJE DIAGRAM!!!!!!!!!!!
    // RUBRIKER UNDER VARJE DIAGRAM ÄVEN DET STORA DIAGRAMMET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // tasksData ? console.log("tasksData exists2") : console.log("Not exist2")

    return (
        <SafeAreaView>
            <ScrollView>
                {statisticsArray && currentHousehold ? (
                    <StatisticsCharts data={statisticsArray} currentHousehold={currentHousehold} />
                ) : (
                    <Text>{fillerMessage}</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default LastMonthScreen;
