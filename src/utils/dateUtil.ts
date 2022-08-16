export class DateUtil {

    /**
     * Converti un string compatible en objet date
     *
     * @param date: String | Date
     * @returns date: Date
     */
    static convertStringDateToDate(date){
        if(typeof date === 'string'){
            date = new Date(date);
        }
        return date;
    }
}
