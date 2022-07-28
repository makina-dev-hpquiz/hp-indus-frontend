
export class Incident {
    // id: number;

    // public name: string = "test";
    // public description: string;
    // public screenshot: string;
    // public priority: string;
    // public date: string;
    // public type: string;



    constructor(
        public id?: string,
        public title?: string,
        public description?: string,
        public screenshotPath?: string,
        public screenshotWebPath?: string,
        public priority?: string,
        public date?: string,
        public type?: string
    ) { }

}
