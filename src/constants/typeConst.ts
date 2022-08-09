export class TypeConst {
    public static readonly none = "Aucune";
    public static readonly event = "evenement";
    public static readonly words = "orthographe";
    public static readonly screen = "interface";

    public static getTypes(){
        return [
            TypeConst.screen,
            TypeConst.words,
            TypeConst.event
        ];
    }

    public static getSearchTypes(){
        return TypeConst.getTypes().concat(TypeConst.none);
    }
}