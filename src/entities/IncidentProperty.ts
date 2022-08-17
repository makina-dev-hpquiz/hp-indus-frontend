export class IncidentProperty {
    constructor(
        public properties: Array<string>,
        public searchProperties: Array<string>,
        public defaultProperty: string
    ) { }
}