export class PriorityConst {
    public static readonly none = 'Aucune';
    public static readonly hight = 'haute';
    public static readonly normal = 'normal';
    public static readonly low = 'basse';

    public static getPriority(){
        return [
            PriorityConst.low,
            PriorityConst.normal,
            PriorityConst.hight
        ];
    }

    public static getSearchPriority(){
        return PriorityConst.getPriority().concat(PriorityConst.none);
    }
}
