export class PriorityConst {
    public static readonly none = "Aucune";
    public static readonly hight = "Haute";
    public static readonly normal = "Normal";
    public static readonly low = "Basse";

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