function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", function () {
    const metrics = document.querySelectorAll('.metric');
    metrics.forEach((metric) => {
        const targetValue = parseInt(metric.getAttribute('data-target'));
        animateValue(metric, 0, targetValue, 2000);
    });
});
