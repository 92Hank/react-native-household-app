import { doneTask } from "../../../Common/doneTask";
import { emoji } from "../../../Common/household";

/**
 * Retrieve one MemberStatistics object per user.
 *
 * Values for the following properties are to be retrieved from the
 * database or otherwise assigned by the implementing component.
 *
 * key: number          - Assigned by the component.
 * userId: string       - Retrieved from member.userId.
 * emoji: emoji         - Retrieved from member.emoji.
 * tasksDone: doneTask[]  - Retrieved from doneTask.id.
 * svg: {}              - Pre-determined, or else assigned by component.
 */
export type MemberStatistics = {
    key: number;
    userId: string;
    emoji: emoji;
    doneTasks: doneTask[];
    svg: {
        fill: string;
        onPress: () => void;
    };
};
