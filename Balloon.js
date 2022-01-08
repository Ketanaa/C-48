class Balloon {
    constructor(x,y,colour) {
        this.x=x;
        this.y=y;
        this.r1=65;
        this.r2=100;
        this.colour=colour
    }
    display() {
        fill(this.colour)
        ellipse(this.x,this.y,this.r1,this.r2);

    }
}