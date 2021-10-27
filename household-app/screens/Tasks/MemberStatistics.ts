import { doneTask } from "../../../Common/doneTask";
import { emoji, fullMemberInfo, household } from "../../../Common/household";

/**
 * Retrieve one MemberStatistics object per user.
 *
 * Values for the following properties are to be retrieved from the
 * database or otherwise assigned by the implementing component.
 *
 * key: number              - Assigned by createMemberStatistics().
 * userId: string           - Retrieved from fullMemberInfo.userId.
 * emoji: emoji             - Retrieved from fullMemberInfo.emoji.
 * tasksDone: doneTask[]    - Assigned by getDoneTasksPerParticipantMember().
 * svg: {}
 */
export type MemberStatistics = {
    key: number;
    userId: string;
    emoji: emoji;
    doneTasks: doneTask[];
    svg: {
        fill: string;
    };
};

export const createMemberStatistics = (doneTasksArray: doneTask[], currentHousehold: household) => {
    const participantMembers = filterOutNonparticipantMembers(doneTasksArray, currentHousehold);
    const doneTasksPerMember = getDoneTasksPerParticipantMember(doneTasksArray, participantMembers);
    let indexValue = 0;

    return participantMembers.map((member) => {
        return {
            key: indexValue++,
            userId: member.userId,
            emoji: convertToEmoji(member.emoji),
            doneTasks: doneTasksPerMember[indexValue],
            svg: {
                fill: getColourCode(member.emoji),
            },
        } as MemberStatistics;
    });
};

/**
 * Function filter out from a particular household all members who
 * are not included in any doneTask in the submitted doneTasksArray.
 *
 * @param doneTasksArray
 * @param currentHousehold
 * @returns
 */
const filterOutNonparticipantMembers = (doneTasksArray: doneTask[], currentHousehold: household) => {
    return currentHousehold.member.filter((householdMember) => {
        doneTasksArray.some((doneTask) => householdMember.userId === doneTask.userId);
    });
};

const getDoneTasksPerParticipantMember = (doneTasksArray: doneTask[], listOfMembers: fullMemberInfo[]) => {
    return listOfMembers.map((member) => {
        return doneTasksArray.filter((doneTask) => doneTask.userId === member.userId);
    });
};

const convertToEmoji = (emojiNumber: number) => {
    switch (emojiNumber) {
        case 1:
            return "🦊" as emoji;
        case 2:
            return "🐷" as emoji;
        case 3:
            return "🐸" as emoji;
        case 4:
            return "🐥" as emoji;
        case 5:
            return "🐙" as emoji;
        case 6:
            return "🐬" as emoji;
        case 7:
            return "🦉" as emoji;
        case 8:
            return "🦄" as emoji;
        default:
            return null;
    }
};

const getColourCode = (emojiNumber: number) => {
    switch (emojiNumber) {
        case 1:
            return "#FF6848";
        case 2:
            return "#FFA2F2";
        case 3:
            return "#CFF5BF";
        case 4:
            return "#F5E9B3";
        case 5:
            return "#F597C4";
        case 6:
            return "#B7DFFF";
        case 7:
            return "#FF9F26";
        case 8:
            return "#E4E5FE";
        default:
            return "#000";
    }
};
