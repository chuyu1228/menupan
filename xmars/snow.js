	
function randomRange(min, max) {
	return ((Math.random()*(max-min)) + min); 
}


function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

function loop() {

for (var i = 0; i < particles.length; i++)	{

		var particle = particles[i]; 
		particle.updatePhysics(); 

		with(particle.position) {
			if ( y < -1000) y += 2000; 
			if (x > 1000) x -= 2000; 
			else if (x < -1000) x += 2000; 
			if (z > 1000) z -= 2000; 
			else if (z<-1000) z += 2000; 
		}				
	}

	camera.position.x += ( mouseX - camera.position.x ) * 0.05;
	camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
	camera.lookAt(scene.position); 

	renderer.render( scene, camera );		
}