// author: kinglong
// all rights reserved.

// var animation; 

var Animation = function(canvas){
	this.init(canvas);
}
Animation.prototype.constructor = Animation;
Animation.prototype.init = function(canvas) {
	this.canvas = canvas;
	// this.context = canvas.getContext('2d');
	// this.isAnimate = true;
	this.object = new Array();
}

Animation.prototype.addObject = function(object) {
	this.object.push(object);
}

Animation.prototype.draw = function() {
	for (var i=0; i<this.object.length; i++) {
		var object = this.object[i];
		if (object != null) {
			object.draw(this.canvas.getContext('2d'));
		}
	}
	// collision detect(ball) and reaction
	for (var i=0; i<this.object.length; i++) {
		if (this.object[i] instanceof Ball) {
			for (var j=i+1; j<this.object.length; j++) {
				if (this.object[i] instanceof Ball) {
					var gapX = this.object[i].x - this.object[j].x;
					var gapY = this.object[i].y - this.object[j].y;
					if ((Math.abs(gapX) < this.object[i].radius+this.object[j].radius)
						&& (Math.abs(gapY) < this.object[i].radius + this.object[j].radius)
						&& (gapX*gapX + gapY*gapY < 
							(this.object[i].radius + this.object[j].radius)*(this.object[i].radius + this.object[j].radius))) {
						/* collision of balls happended */
						// go back after collision
						// this.object[i].setDelta(-this.object[i].deltaX, -this.object[i].deltaY);
						// this.object[j].setDelta(-this.object[j].deltaX, -this.object[j].deltaY);
						
						/* completely elastic collision */
						var o1 = this.object[i];
						var o2 = this.object[j];
						var o1deltaX = ((o1.weight-o2.weight)*o1.deltaX+2*o2.weight*o2.deltaX)/(o1.weight+o2.weight);
						var o1deltaY = ((o1.weight-o2.weight)*o1.deltaY+2*o2.weight*o2.deltaY)/(o1.weight+o2.weight);
						o2.setDelta(((o2.weight-o1.weight)*o2.deltaX+2*o1.weight*o1.deltaX)/(o1.weight+o2.weight), 
							((o2.weight-o1.weight)*o2.deltaY+2*o1.weight*o1.deltaY)/(o1.weight+o2.weight));
						o1.setDelta(o1deltaX, o1deltaY);
					}
				}
			}
		}
	}
}

Animation.prototype.animate = function() {
	this.animationInterval = 10; //ms
	var self = this;
	setInterval(function() {
		var ctx = self.canvas.getContext('2d');
		ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
		self.draw();
	}, self.animationInterval);
}
