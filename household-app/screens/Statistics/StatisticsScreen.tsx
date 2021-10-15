import React, { FC } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { FeedStackScreenProps, MainRoutes } from '../../routes/routes';
import { PieChart } from "react-native-chart-kit";

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const StatisticsScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {

    const data = [
        {
            name: "Seoul",
            population: 21500000,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Toronto",
            population: 2800000,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Beijing",
            population: 527612,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "New York",
            population: 8538000,
            color: "#ffffff",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Moscow",
            population: 11920000,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];

    const screenWidth = Dimensions.get("window").width; // 	Width of the chart, use 'Dimensions' library to get the width of your screen for responsive

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const clickOnTask = () => {
        console.log("click on task");
    }

    //fixa biblioteket med react diagram https://www.npmjs.com/package/react-native-chart-kit
    //lägg in piecharts osv

    return (
        <SafeAreaView>
            <View>
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[10, 50]}
                    absolute
                />
            </View>
        </SafeAreaView>
    )
};

export default StatisticsScreen;

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