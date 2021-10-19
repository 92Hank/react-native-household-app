import { emoji } from "../../../Common/member";

/**
 * key: number - assigned by the component.
 * userId: string - equals member.userId.
 * emoji: - equals member.emoji.
 * tasksDone: string[] - equals doneTask.id.
 * svg: {} is pre-determined.
 */
 export type MemberStatistics = {
    key: number,
    userId: string,
    emoji: emoji,
    tasksDone: string[],
    svg: {
        fill: string,
        onPress: () => void
    },
}
