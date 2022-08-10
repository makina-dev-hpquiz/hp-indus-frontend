
export class Incident {
    constructor(
        public id?: string,
        public title?: string,
        public description?: string,
        public screenshotPath?: string,
        public screenshotWebPath?: string,
        public priority?: string,
        public date?: string,
        public type?: string,
        public status?: string
    ) { }

}
