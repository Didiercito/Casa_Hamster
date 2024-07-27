export class DHT11 {
    public id: number
    public temperature: number; 
    public humidity: number; 


    constructor(temperature: number, humidity: number, id: number){
        this.temperature = temperature;
        this.humidity = humidity;
        this.id = id
    }
}