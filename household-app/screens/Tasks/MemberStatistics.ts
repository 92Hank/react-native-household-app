import { emoji } from "../../../Common/member";
import doneTask from "../../../Common/doneTask";

/**
 * Retrieve one MemberStatistics object per user.
 * 
 * Values for the following properties are to be retrieved from the
 * database or otherwise assigned by the implementing component.
 * 
 * key: number          - Assigned by the component.
 * userId: string       - Retrieved from member.userId.
 * emoji: emoji         - Retrieved from member.emoji.
 * tasksDone: string[]  - Retrieved from doneTask.id.
 * svg: {}              - Pre-determined, or else assigned by component.
 */
 export type MemberStatistics = {
    key: number,
    userId: string,
    emoji: emoji,
    tasksDone: doneTask[],
    svg: {
        fill: string,
        onPress: () => void
    },
}
