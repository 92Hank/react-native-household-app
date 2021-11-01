import React, { FC } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { PieChart as ImportedPieChart } from "react-native-svg-charts";
import { doneTask } from "../../../Common/doneTask";
import { MemberStatistics } from "../../screens/Tasks/MemberStatistics";

interface Props {
    data: MemberStatistics[];
    specificTaskId: string;
    style: StyleProp<ViewStyle>[];
}

const SmallPieChart: FC<Props> = ({ data, specificTaskId, style, children }): React.ReactElement => {
    return (
        <View style={styles.smallChartSingleViewStyle}>
            <ImportedPieChart
                style={style[0]}
                data={data}
                outerRadius={"92%"}
                innerRadius={"0%"}
                padAngle={0.0}
                valueAccessor={({ item }) => {
                    let totalValue = 0;
                    const counter: doneTask[] = []; //TEST
                    for (let i = 0; i < item.doneTasks.length; i++) {
                        if (item.doneTasks[i].taskId === specificTaskId && item.doneTasks[i].value) {
                            totalValue += item.doneTasks[i].value as number;
                            counter.push(item.doneTasks[i]); //TEST
                        }
                    }
                    console.log(item.emoji + "TOTAL VALUE" + totalValue + " for " + specificTaskId)//TEST YTEEEEEST
                    console.log("SPECIFIC DONETASKS: ") //TEST
                    console.log(counter)

                    return totalValue;
                }}
            />
            {children}
        </View>
    );
};

export default SmallPieChart;

const styles = StyleSheet.create({
    smallChartSingleViewStyle: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        flexBasis: "30%",
    },
});
