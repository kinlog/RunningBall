// author: kinglong
// all rights reserved.

var startAnimation = function() {
	var canvas = document.getElementById('canvas');
	var animation = new Animation(canvas);
	for (var i=0; i<10; i++) {
		var ball = new Ball();
		ball.setBounds(0, 0, canvas.width, canvas.height);
		ball.setPosition(randomInt(0, canvas.width), randomInt(0, canvas.height));
		ball.setDelta(randomInt(20, 100), randomInt(20, 100));
		ball.move();
		animation.addObject(ball);
	}
	animation.animate();
}

var randomInt = function(lowerBound, upperBound) {
	return parseInt(lowerBound + Math.random() * (upperBound-lowerBound));
}