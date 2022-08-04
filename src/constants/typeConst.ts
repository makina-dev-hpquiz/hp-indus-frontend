export class TypeConst {
    public static readonly none = "Aucune";
    public static readonly event = "Evénèment";
    public static readonly words = "Orthographe";
    public static readonly screen = "Interface";

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