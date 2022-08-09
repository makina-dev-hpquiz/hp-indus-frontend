export class IncidentFilter {
    constructor(public sort?: string,
        public q?: string,
        public status?: string[],
        public priority?: string,
        public type?: string) {}

}