import React, { FC } from 'react';
import { PieChart as ImportedPieChart } from 'react-native-svg-charts';
import { number } from 'yup/lib/locale';
import task from '../../Common/Task';
import { MemberStatistics } from '../screens/Statistics/StatisticsScreen';
import PieChartLabels from './PieChartLabels';

interface Props {
    data: MemberStatistics[];
    allTasks: task[];
}

const PieChart: FC<Props> = ({ data, allTasks }): React.ReactElement => {

    const dataTEST = [
        {
            key: 1,
            amount: {50: number},
            svg: { fill: '#600080' },
        },
        {
            key: 2,
            amount: {50: number},
            svg: { fill: '#9900cc' }
        },
        {
            key: 3,
            amount: {50: number},
            svg: { fill: '#c61aff' }
        },
        {
            key: 4,
            amount: {50: number},
            svg: { fill: '#d966ff' }
        },
        {
            key: 5,
            amount: {50: number},
            svg: { fill: '#ecb3ff' }
        }
    ]
    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);

    // const pieData = data
    // // .filter(() => value > 0)
    // .map((value, index) => ({
    //     value,
    //     svg: {
    //         fill: randomColor(),
    //         onPress: () => console.log('USER', value.userId),
    //     },
    //     key: `pie-${index}`,
    // }))

    return (
        <ImportedPieChart
            style={{ height: 240 }}
            data={data}
            outerRadius={'92%'}
            innerRadius={'0%'}
            padAngle={0.01}
            valueAccessor={({ item }) => {
                let totalValue = 0;
                for (let i = 0; i < item.tasksDone.length; i++) {
                    const doneTask = allTasks.find(task => task.id === item.tasksDone[i]);
                    // if (!doneTask) return totalValue = 0;

                    console.log(doneTask)

                    const valueOfTask = doneTask!.value!; //DENNA ÄR UNDEFNERD
                    totalValue += valueOfTask;
                }

                return totalValue;
            }} //beräkna här value*donetasks* osv... indexera item.tasksDone[0] //HUR KOPPLA ENSKILD LABEL TILL VISS EMOJI?
        >
            <PieChartLabels />
        </ImportedPieChart>
    )
};

export default PieChart;


