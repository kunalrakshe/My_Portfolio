// Initialize AOS
AOS.init({
duration: 800, // global duration for animations
once: true // animations happen only once
});

// Typing Effect for Homepage
const words = ["Aspiring Data Analyst", "Leveraging Power BI", "SQL Expert", "Excel Wiz", "Crafting Insights", "Data Storyteller"];
let i = 0, j = 0, currentWord = '', isDeleting = false;
const typingText = document.getElementById('typing-text');
function type() {
if (i >= words.length) i = 0;
currentWord = words[i];
if (isDeleting) {
typingText.textContent = currentWord.substring(0, j--);
} else {
typingText.textContent = currentWord.substring(0, j++);
}
if (!isDeleting && j === currentWord.length + 1) { // Added +1 to ensure full word is shown
isDeleting = true;
setTimeout(type, 1000); // Pause at end of word
} else if (isDeleting && j === -1) { // Changed to -1 to clear word before next
isDeleting = false;
i++;
setTimeout(type, 300); // Pause before typing next word
} else {
setTimeout(type, isDeleting ? 50 : 150);
}
}
type();

// Data Network Background Animation (unchanged)
const canvas = document.getElementById('dataCanvas');
const ctx = canvas.getContext('2d');
let nodes = [];
const nodeCount = 60;
let mouse = { x: null, y: null };
function resizeCanvas() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
nodes = [];
for (let i = 0; i < nodeCount; i++) {
nodes.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
vx: (Math.random() - 0.5) * 1.2,
vy: (Math.random() - 0.5) * 1.2
});
}
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
canvas.addEventListener('mousemove', e => {
mouse.x = e.clientX;
mouse.y = e.clientY;
});
function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
nodes.forEach(node => {
node.x += node.vx;
node.y += node.vy;
if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
ctx.beginPath();
ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
ctx.fillStyle = "#fcbf49";
ctx.fill();
// Move closer to mouse
if (mouse.x && mouse.y) {
const dist = Math.sqrt(Math.pow(node.x - mouse.x, 2) + Math.pow(node.y - mouse.y, 2));
if (dist < 100) {
node.x += (mouse.x - node.x) * 0.005;
node.y += (mouse.y - node.y) * 0.005;
}
}
});
// Draw connecting lines
for (let a = 0; a < nodes.length; a++) {
for (let b = a + 1; b < nodes.length; b++) {
let dx = nodes[a].x - nodes[b].x;
let dy = nodes[a].y - nodes[b].y;
let dist = Math.sqrt(dx * dx + dy * dy);
if (dist < 150) {
ctx.strokeStyle = "rgba(252,191,73," + (1 - dist / 150) + ")";
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(nodes[a].x, nodes[a].y);
ctx.lineTo(nodes[b].x, nodes[b].y);
ctx.stroke();
}
}
}
requestAnimationFrame(animate);
}
animate();


// Skill Bars Animation on Scroll
const skillBars = document.querySelectorAll('.skill-bar');
const skillsSection = document.getElementById('skills');

const animateSkillBars = () => {
skillBars.forEach(bar => {
const targetWidth = bar.getAttribute('aria-valuenow') + '%';
bar.style.width = targetWidth;
});
};

// Intersection Observer for Skills Section to trigger animations
const skillsObserver = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
animateSkillBars();
document.getElementById('skillsLottie').play(); // Play Lottie animation
observer.unobserve(entry.target); // Stop observing once animated
}
});
}, { threshold: 0.5 }); // Trigger when 50% of the section is visible

skillsObserver.observe(skillsSection);


// Rotating Data Keywords for Contact Section (unchanged)
const keywords = ["Data Enthusiast", "Analytics Explorer", "Insight Generator", "Data Storyteller"];
let k = 0;
const keywordElement = document.getElementById('data-keywords');
function rotateKeywords() { keywordElement.innerText = keywords[k]; k=(k+1)%keywords.length; }
rotateKeywords();
setInterval(rotateKeywords,2000);

// Typing effect for contact message (unchanged)
const message = `Hello there!\n\nI’m thrilled to connect with you! Whether you have a data puzzle to solve, a project to discuss or just want to chat about the fascinating world of data analysis, I’m all ears. Your ideas and questions are the driving force behind what I do and I’d love to hear from you.\n\nFeel free to drop me a message using the contacts below. No question is too big or small. Let’s explore the possibilities together and turn your data into actionable insights!\n\nLooking forward to our conversation.`;
let charIndex=0;
function typeEffect() { if(charIndex<message.length){ const current = message.charAt(charIndex)==='\n'?'<br>':message.charAt(charIndex); document.getElementById('contact-message').innerHTML+=current; charIndex++; setTimeout(typeEffect,20);} }
typeEffect();