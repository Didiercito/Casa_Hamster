export class Sensor{
    public id:string;
    public humidity:string;
    public temperature:string;
    public distance:string;
    public ldrValue:string;
    public dayOrNight:string;

    constructor(id:string,humadity:string,temperature:string,distance:string,ldrValue:string,dayOrNight:string){
        this.id=id;
        this.humidity=humadity;
        this.temperature=temperature;
        this.distance=distance;
        this.ldrValue=ldrValue;
        this.dayOrNight=dayOrNight;
    }
}