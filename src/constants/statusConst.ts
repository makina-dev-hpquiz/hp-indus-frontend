export class StatusConst {
    
    public static readonly toDo = "en attente";
    public static readonly doing = "en cours ";
    public static readonly done = "terminé";

    public static getStatus(){
        return [
            StatusConst.toDo,
            StatusConst.doing,
            StatusConst.done
        ];
    }
}