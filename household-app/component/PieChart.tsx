import React, { FC } from 'react';
import { PieChart as ImportedPieChart } from 'react-native-svg-charts';
import PieChartLabels from './PieChartLabels';

interface Props {
    data: number[];
 }

const PieChart: FC<Props> = ({data}): React.ReactElement => {

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
        <ImportedPieChart
            style={{ height: 240 }}
            data={pieData}
            outerRadius={'92%'}
            innerRadius={'0%'}
            padAngle={0.01}
        // valueAccessor={({ item }) => item.amount} //VAR KOMMER ALLA SLICES IFRÅN?? inbyggda props???
        >
            <PieChartLabels />
        </ImportedPieChart>
    )
};

export default PieChart;


