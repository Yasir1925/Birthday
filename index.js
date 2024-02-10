document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('balloonCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    let balloons = [];

    function addBalloon() {
        let x = Math.random() * canvas.width;
        let y = canvas.height + 100;
        let speed = 1 + Math.random();
        let size = 20 + Math.random() * 40;
        let color = `hsl(${Math.random() * 360}, 100%, 50%)`;

        balloons.push({ x, y, speed, size, color });
    }

    function drawBalloon(balloon) {
        ctx.beginPath();
        ctx.ellipse(balloon.x, balloon.y, balloon.size, balloon.size * 1.2, 0, 0, 2 * Math.PI);
        ctx.fillStyle = balloon.color;
        ctx.fill();
    }

    function updateAndDrawBalloons() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balloons.forEach(balloon => {
            balloon.y -= balloon.speed;
            drawBalloon(balloon);
        });
        balloons = balloons.filter(balloon => balloon.y + balloon.size > 0);
        requestAnimationFrame(updateAndDrawBalloons);
    }

    function startCelebration() {
        for (let i = 0; i < 100; i++) {
            setTimeout(addBalloon, 200 * i);
        }
        setTimeout(() => {
            document.getElementById('birthdayMessage').classList.remove('hidden');
        }, 5000);
        updateAndDrawBalloons();
    }

    startCelebration();
});
