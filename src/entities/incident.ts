
export class Incident {
    constructor(
        public id?: string,
        public title?: string,
        public description?: string,
        public screenshotPath?: string,
        public screenshotWebPath?: string,
        public priority?: string,
        public updatedAt?: Date,
        public createdAt?: Date,
        public type?: string,
        public status?: string
    ) {}

}
