import { DateUtil } from './dateUtil';

describe('DateUtil', () => {

    it('TEST DateUtil.convertStringDateToDate', async () => {
        const currentDate = new Date();
        const currentDateStr = currentDate.toISOString();
        DateUtil.convertStringDateToDate(currentDate);


        expect(currentDate).toEqual(DateUtil.convertStringDateToDate(currentDate));
        expect(currentDate).toEqual(DateUtil.convertStringDateToDate(currentDateStr));
    });
});
