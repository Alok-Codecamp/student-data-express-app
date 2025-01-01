import { TSchedulse } from "./offeredCourse.interface";



export const hasTimeConfilct = (assignSchedules: TSchedulse[], newSchedulse: TSchedulse) => {

    for (const sdl of assignSchedules) {
        const existingStartTime = new Date(`1970-01-01T${sdl.startTime}`)

        const existingEndTime = new Date(`1970-01-01T${sdl.endTime}`);

        const newStartTime = new Date(`1970-01-01T${newSchedulse.startTime}`)
        const newEndTime = new Date(`1970-01-01T${newSchedulse.endTime}`)

        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            return true;
        }
    }

    return false
}

