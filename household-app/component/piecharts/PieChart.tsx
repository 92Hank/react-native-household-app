import React, { FC } from "react";
import { View } from "react-native";
import { PieChart as ImportedPieChart } from "react-native-svg-charts";
import { MemberStatistics } from "../../screens/Tasks/memberStatistics";
import PieChartLabels from "./PieChartLabels";

interface Props {
    data: MemberStatistics[];
    taskName: string;
}

const PieChart: FC<Props> = ({ data, children }): React.ReactElement => {
    return (
        <View>
            <ImportedPieChart
                style={{ height: 240 }}
                data={data}
                outerRadius={"92%"}
                innerRadius={"0%"}
                padAngle={0.0}
                valueAccessor={({ item }) => {
                    //Piechart slice calculation.
                    let totalValue = 0;
                    for (let i = 0; i < item.doneTasks.length; i++) {
                        if (item.doneTasks[i].value) totalValue += item.doneTasks[i].value as number;
                    }
                    return totalValue;
                }}
            >
                <PieChartLabels />
            </ImportedPieChart>
            {children}
        </View>
    );
};

export default PieChart;
