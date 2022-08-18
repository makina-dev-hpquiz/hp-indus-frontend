export class IncidentFilter {
    constructor(public sort?: string,
        public search?: string,
        public status?: string[],
        public priority?: string,
        public type?: string) {
        if (!status) {
            this.status = new Array();
        } else {
            this.status = status;
        }
    }

}
