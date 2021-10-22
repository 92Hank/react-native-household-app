import React, { FC } from "react";
import { PieChart as ImportedPieChart } from "react-native-svg-charts";
import { MemberStatistics } from "../screens/Tasks/memberStatistics";
import PieChartLabels from "./PieChartLabels";

interface Props {
    data: MemberStatistics[];
}

const PieChart: FC<Props> = ({ data }): React.ReactElement => {
    return (
        <ImportedPieChart
            style={{ height: 240 }}
            data={data}
            outerRadius={"92%"}
            innerRadius={"0%"}
            padAngle={0.0}
            valueAccessor={({ item }) => {
                //Piechart slice calculation.
                let totalValue = 0;

                for (let i = 0; i < item.doneTasks.length; i++) totalValue += item.doneTasks[i].value;

                return totalValue;
            }}
        >
            <PieChartLabels />
        </ImportedPieChart>
    );
};

export default PieChart;
