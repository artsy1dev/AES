export function createButton(action) {
    var canvas = document.getElementById("MainCanvas");

    var boton = document.createElement("div");
    boton.textContent = "Botón";
    boton.style.backgroundColor = "blue";
    boton.style.width = "100px";
    boton.style.height = "40px";
    boton.style.position = "absolute";
    
    var canvasRect = canvas.getBoundingClientRect();
    boton.style.left = (canvasRect.left + 50) + "px"; 
    boton.style.top = (canvasRect.top + 50) + "px";
    
    boton.addEventListener("click", function() {
        action();
    });

    canvas.appendChild(boton);
    document.body.appendChild(boton);
}