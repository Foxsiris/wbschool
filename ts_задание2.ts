
interface Engine {
    isRunning: boolean;
    start(): void;
    stop(): void;
    getStatus(): string;
  }
  
  interface Electronics {
    lightsOn: boolean;
    turnLightsOn(): void;
    turnLightsOff(): void;
    getStatus(): string;
  }
  
  interface Car {
    model: string;
    year: number;
    mileage: number;
    engine: Engine;
    electronics: Electronics;
  
    getCarInfo(): void;
    getCarStatus(): void;
  }
  
  class BasicEngine implements Engine {
    isRunning: boolean = false;
  
    start(): void {
      if (!this.isRunning) {
        this.isRunning = true;
        console.log("Двигатель работает");
      } else {
        console.log("Двигатель уже запущен.");
      }
    }
  
    stop(): void {
      if (this.isRunning) {
        this.isRunning = false;
        console.log("Двигатель не работает.");
      } else {
        console.log("Двигатель уже остановлен.");
      }
    }
  
    getStatus(): string {
      return this.isRunning ? "Двигатель работает" : "Двигатель остановлен";
    }
  }
  
  class SmartElectronics implements Electronics {
    lightsOn: boolean = false;
  
    turnLightsOn(): void {
      if (!this.lightsOn) {
        this.lightsOn = true;
        console.log("Фары включены.");
      } else {
        console.log("Фары уже включены.");
      }
    }
  
    turnLightsOff(): void {
      if (this.lightsOn) {
        this.lightsOn = false;
        console.log("Фары выключены.");
      } else {
        console.log("Фары уже выключены.");
      }
    }
  
    getStatus(): string {
      return this.lightsOn ? "Фары включены" : "Фары выключены";
    }
  }
  
  class BasicCar implements Car {
    model: string;
    year: number;
    mileage: number;
    engine: Engine;
    electronics: Electronics;
  
    constructor(model: string, year: number, mileage: number) {
      this.model = model;
      this.year = year;
      this.mileage = mileage;
      this.engine = new BasicEngine();
      this.electronics = new SmartElectronics();
    }
  
    getCarInfo(): void {
      console.log(`Модель: ${this.model}, Год выпуска: ${this.year}, Пробег: ${this.mileage} км`);
    }
  
    getCarStatus(): void {
      console.log("Текущая информация об автомобиле:");
      console.log(this.engine.getStatus());
      console.log(this.electronics.getStatus());
    }
  }
  
  
  const myCar = new BasicCar("BMW M5", 2022, 5542);
  
  myCar.getCarInfo();

  myCar.engine.start();
  myCar.engine.start();
  myCar.engine.stop();
  
  myCar.electronics.turnLightsOn();
  myCar.electronics.turnLightsOff();
  
  myCar.getCarStatus();
  