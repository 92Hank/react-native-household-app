import React, { FC, FunctionComponent } from 'react';
import { Dimensions, SafeAreaView, View } from "react-native";
import { PieChart, ChartProps, PieChartData, PieChartProps } from 'react-native-svg-charts'
import { Circle, G, Image, NumberArray } from 'react-native-svg'
import { FeedStackScreenProps, MainRoutes } from '../../routes/routes';
import { useLinkProps } from '@react-navigation/native';

import Assets from '../../assets'

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const StatisticsScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const data = [50, 10, 40, 95, -4, -24, 85, 91]

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





    type slice = {
        data: object,
        index: number,
        value: number,
        startAngle: number,
        endAngle: number,
        padAngle: number,
        pieCentroid: NumberArray[],
        labelCentroid: NumberArray[],
    }

    type LabelProps = {
        slices?: slice[],
        // height: number,
        // width: number,
    };


    // https://stackoverflow.com/q/61733861 //typa upp med slice
    // https://github.com/JesperLekland/react-native-svg-charts#arguments-to-children-5

    const Labels = ({ slices }: LabelProps) => { 
        return (
            // <> {
                slices!.map((slice, index) => {
                    const { labelCentroid, pieCentroid, data } = slice;
                    return ( 
                    // <View></View>

                        <G
                            key={index}
                            x={labelCentroid[0]}
                            y={labelCentroid[1]}
                        >
                            <Circle
                                r={18}
                                fill={'#fff'}
                            />
                            <Image
                                x={-10}
                                y={-10}
                                width={20}
                                height={20}
                                preserveAspectRatio="xMidYMid slice"
                                opacity="1"
                                href={Assets.images[2]}
                            />
                        </G>
                    )
                })
            // } </>
        )
    }



    return (
        <SafeAreaView>
            <View>
                <PieChart
                    style={{ height: 240 }}
                    data={pieData}
                    // outerRadius={'95%'}
                    innerRadius={'0%'}
                    padAngle={0.01}
                // valueAccessor={({ item }) => item.amount} //VAR KOMMER ALLA SLICES IFRÅN?? inbyggda props???
                >
                    <Labels />
                </PieChart>
            </View>
        </SafeAreaView>
    )
};

export default StatisticsScreen;