export class IncidentFilter {
    constructor(public sort?: string,
        public search?: string,
        public status?: string[],
        public priority?: string,
        public type?: string) {
        !status ? this.status = new Array() : this.status = status;
    }

}
