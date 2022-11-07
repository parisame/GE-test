export class watch {

  private _hour: number;
  private _minute: number;
  private _second: number;
  private currentMode: number = 0;

  constructor(hour: number= new Date().getHours(), minute: number = new Date().getMinutes(), second: number = new Date().getSeconds()) {
    this._hour = hour;
    this._minute = minute;
    this._second = second;
    setInterval(() => this.increaseSec(), 1000)
  }

  public get hour() {
    return this._hour;
  }
 
  public set hour(hour: number) {
    if (hour <= 0 || hour >= 24) {
      throw new Error('The hour is invalid');
    }
    this._hour = hour;
  }


  public get minute() {
    return this._minute;
  }

  public set minute(minute: number) {
    if (minute <= 0 || minute >= 60) {
      throw new Error('The minute is invalid');
    }
    this._minute = minute;
  }

  public get second() {
    return this._second;
  }

  public set second(second: number) {
    if (second <= 0 || second >= 60) {
      throw new Error('The second is invalid');
    }
    this._second = second;
  }

  public get time() {
    let H = this._hour.toString().length < 2 ? '0' + this._hour : this._hour;
    let M = this._minute.toString().length < 2 ? '0' + this._minute : this._minute;
    let S = this._second.toString().length < 2 ? '0' + this._second : this._second;
    return `<span class='hourPart'>${H}</span>:<span class='minutePart'>${M}</span>:<span>${S}</span>`;
  }

  public drawWatch(parentId: string) {
    const watchBody = document.createElement('div');
    const timeDisplay = document.createElement('span');
    const buttons = document.createElement('div')
    const modeButton = document.createElement('button');
    const increaseButton = document.createElement('button');
    const lightButton = document.createElement('button');
    const styleElement = document.createElement('style')
    document.head.appendChild(styleElement);


    watchBody.classList.add('watchBody');
    buttons.classList.add('buttonsGroup');
    timeDisplay.classList.add('timeDisplay')

    //mode button
    modeButton.innerHTML = 'mode';
    modeButton.classList.add("Button");
    modeButton?.addEventListener('click', (e: Event) => this.mode(styleElement));
    buttons.appendChild(modeButton)

    //increase button
    increaseButton.innerHTML = 'increase'
    increaseButton.classList.add("Button");
    increaseButton?.addEventListener('click', (e: Event) => this.increase(timeDisplay));
    buttons.appendChild(increaseButton)

    //light button
    lightButton.innerHTML = 'light'
    lightButton.classList.add("Button");
    lightButton?.addEventListener('click', (e: Event) => this.switchLight(timeDisplay));
    buttons.appendChild(lightButton)


    this.updateTime(timeDisplay);
    document.getElementById(parentId)?.appendChild(watchBody);
    watchBody.appendChild(timeDisplay)
    watchBody.appendChild(buttons)

    setInterval(() => this.updateTime(timeDisplay), 1000)
  }

  private updateTime(timeDisplay: HTMLElement) {
    timeDisplay.innerHTML = this.time;
  }

  private mode(styleElement: HTMLElement) {
    this.currentMode = (this.currentMode + 1) % 3;
    this.modeIndicator(styleElement)
   
    
  }
  private modeIndicator(styleElement: HTMLElement){
    switch (this.currentMode) {
      case 0: {
        styleElement.innerHTML = ''
        break;
      }
      case 1: {
        styleElement.innerHTML = `
        .hourPart{
          text-decoration: underline;
        }    
        `

        break;
      }
      case 2: {
        styleElement.innerHTML = `
        .minutePart{
          text-decoration: underline;
        }    
        `
        break;
      }
    }
  }

  private increase(timeDisplay: HTMLElement) {
    switch (this.currentMode) {
      case 0: {
        break;
      }
      case 1: {
        this.increaseHour()
        break;
      }
      case 2: {
        this.increaseMin()
        break;
      }
    }
    this.updateTime(timeDisplay)
  }

  private increaseMin() {
    if (this._minute === 59) {
      this._minute = 0;
      this.increaseHour()
    } else {
      this._minute = this._minute + 1;

    }
  }
  private increaseHour() {
    if (this._hour === 23) {
      this._hour = 0;
    } else {
      this._hour = this._hour + 1;
    }
  }
  private increaseSec() {
    if (this._second === 59) {
      this._second = 0;
      this.increaseMin()
    } else {
      this._second = this._second + 1;
    }
  }

  private switchLight(timeDisplay: HTMLElement){
      timeDisplay.classList.toggle('lightOn');
  }
}


