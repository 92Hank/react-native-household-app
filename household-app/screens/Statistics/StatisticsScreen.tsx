import React, { FC } from 'react';
import { Dimensions, SafeAreaView, View } from "react-native";
import { PieChart } from 'react-native-svg-charts'
import { FeedStackScreenProps, MainRoutes } from '../../routes/routes';

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const StatisticsScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);

    const pieData = data
        .filter((value) => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))



    return (
        <SafeAreaView>
            <View>
                <PieChart
                    style={{ height: 240 }}
                    data={pieData}
                    // outerRadius={'95%'}
                    innerRadius={'0%'}
                    padAngle={0.01}
                    // valueAccessor={({ item }) => item.amount}
                />
            </View>
        </SafeAreaView>
    )
};

export default StatisticsScreen;