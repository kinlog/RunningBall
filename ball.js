// author: kinglong
// all rights reserved.

var Ball = function() {
	this.init();
	// this.move();
}
Ball.prototype.constructor = Ball;
Ball.prototype.init = function() {
	this.x = 50.0;
	this.y = 50.0;
	this.radius = 20;
	this.weight = 10;
	this.foregroundColor = "#0000ff";
	this.backgroundColor = "#00ff00";

	this.deltaX = 100.0;
	this.deltaY = 100.0;
};

Ball.prototype.setBounds = function(startX, startY, width, height) {
	this.startX = startX;
	this.startY = startY;
	this.width = width;
	this.height = height;
	return this;
}

Ball.prototype.setPosition = function(x, y) {
	this.x = x;
	this.y = y;
	return this;
}
Ball.prototype.setDelta = function (deltaX, deltaY) {
	this.deltaX = deltaX;
	this.deltaY = deltaY;
	return this;
}
Ball.prototype.setWeight = function(weight) {
	this.weight = weight;
	return this;
}

Ball.prototype.draw = function(ctx) {
	// console.log(this.x + ":"+ this.y);
	ctx.beginPath() ;
	// 设置透明度
	ctx.globalAlpha = 0.4 ;
	// 画背景
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false) ;
	ctx.fillStyle = this.backgroundColor ;
	ctx.fill() ;
	// 画外框
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false) ;
	ctx.strokeStyle = this.foregroundColor ;
	ctx.lineWidth = 2 ;
	ctx.stroke() ;
}

Ball.prototype.click = function() {
	console.log('click');
}

Ball.prototype.move = function() {
	var timeInterval = 10;	//ms
	
	var self = this;
	setInterval(function(){
		// this = self;
		// this.x += 1.0*this.deltaX*timeInterval/1000;
		// this.y += 1.0*this.deltaY*timeInterval/1000;
		self.x += 1.0*self.deltaX*timeInterval/1000;
		self.y += 1.0*self.deltaY*timeInterval/1000;
		// collision detect(with bounds) and reaction
		if ((self.x - self.radius < self.startX) && self.deltaX < 0) {
			self.deltaX  *= -1;
		}
		if ((self.x + self.radius > self.startX + self.width) && self.deltaX > 0) {
			self.deltaX  *= -1;
		}
		if ((self.y - self.radius < self.startY) && self.deltaY < 0) {
			self.deltaY *= -1;
		}
		if ((self.y + self.radius > self.startY + self.height) && self.deltaY > 0) {
			self.deltaY *= -1;
		}

	}, timeInterval);
}