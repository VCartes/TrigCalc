var triangle = {
    sides: [],
    angles: []
};

var nsides;
var nangles;

function empty() {
    document.getElementById("aSide").value = "";
    document.getElementById("bSide").value = "";
    document.getElementById("cSide").value = "";
    document.getElementById("alpha").value = "";
    document.getElementById("beta").value = "";
    document.getElementById("gamma").value = "";
    document.getElementsByClassName("imposible")[0].style.display = "none";
};

//Value Check
function check() {
    document.getElementsByClassName("imposible")[0].style.display = "none";
    nsides = 0;
    nangles = 0;

    triangle.angles = [];
    triangle.sides = [];

    //Asignación de valores
    triangle.sides.push(Number(document.getElementById("aSide").value));
    triangle.sides.push(Number(document.getElementById("bSide").value));
    triangle.sides.push(Number(document.getElementById("cSide").value));

    triangle.angles.push(Number(document.getElementById("alpha").value));
    triangle.angles.push(Number(document.getElementById("beta").value));
    triangle.angles.push(Number(document.getElementById("gamma").value));

    //Cuenta de lados y ángulos
    for (var i in triangle.sides) {
        if(triangle.sides[i] !== 0  && !Number.isNaN(triangle.sides[i])){nsides++};
    }

    for (var i in triangle.angles) {
        if(triangle.angles[i] !== 0 && !Number.isNaN(triangle.angles[i])){nangles++};
    }

    console.log("Sides: " + nsides);
    console.log("Angles: " + nangles);

    //Revisión de algoritmo a ocupar
    //3 Lados, 0 Ángulos
    if (nsides === 3 && nangles === 0) {
        let ordered = triangle.sides;
        if(ordered[0] > ordered[1]){let x = ordered[0]; ordered[0] = ordered[1]; ordered[1] = x};
        if(ordered[1] > ordered[2]){let x = ordered[1]; ordered[1] = ordered[2]; ordered[2] = x};
        if(ordered[0] > ordered[1]){let x = ordered[0]; ordered[0] = ordered[1]; ordered[1] = x};
        console.log(ordered);

        if (ordered[2] < ordered[1] + ordered[0]) {
            s3a0();
        } else {
            impossible();
        }
    }

    //2 Lados, 1 Ángulo
    if (nsides === 2 && nangles === 1) {
        
        let angleBetweenSides = false;
        let angleIndex;
        let sideIndex = [];
        console.log("2 Lados, 1 Angulo")
        for (var i = 0; i < triangle.angles.length; i++) {
            if (triangle.angles[i] !== 0 && !Number.isNaN(triangle.angles[i])) {
                angleIndex = i;
                if (triangle.sides[i] == 0 || Number.isNaN(triangle.sides[i])) {
                    angleBetweenSides = true;
                }
            }
        }

        for (var i = 0; i < triangle.sides.length; i++) {
            if (triangle.sides[i] == 0 || Number.isNaN(triangle.sides[i])) {continue;}
            sideIndex.push(i);
        }

        //Separador de tipos
        if (angleBetweenSides) {
            s2a1a(angleIndex, sideIndex);
            console.log("Angulo entre lados")
        } else {
            if (angleIndex === sideIndex[0]) {
                console.log(sideIndex[0])
                if (triangle.sides[sideIndex[0]] >= Math.sin(triangle.angles[angleIndex])*triangle.sides[sideIndex[1]]) {
                    s2a1b(angleIndex, sideIndex[1]);
                } else {
                    impossible();
                }
            } else {
                console.log(sideIndex[1])
                if (triangle.sides[sideIndex[1]] >= Math.sin(triangle.angles[angleIndex])*triangle.sides[sideIndex[0]]) {
                    s2a1b(angleIndex, sideIndex[0]);
                } else {
                    impossible();
                }
            }
        }
    }

    //1 Lado, 2 Ángulos
    if (nsides === 1 && nangles === 2) {
        let sideIndex;
        let angleIndex = [];

        for (var i = 0; i < triangle.sides.length; i++) {
            if (triangle.sides[i] !== 0 && !Number.isNaN(triangle.sides[i])){
                sideIndex = i;
            }
        }

        for (var i = 0; i < triangle.angles.length; i++) {
            if (triangle.angles[i] !== 0 && !Number.isNaN(triangle.angles[i])) {
                angleIndex.push(i);
            }
        }

        console.log("Side Index: " + sideIndex);
        console.log("Angle Index: " + angleIndex[0] + " " + angleIndex[1]);

        if (angleIndex[0] + angleIndex[1] < Math.PI) {
            s1a2(angleIndex, sideIndex);
        } else {
            impossible();
        }
    }

    if (nsides + nangles != 3 || nangles === 3 ){
        impossible();
    }
}

//3 Lados, 0 Ángulos
function s3a0() {
    let alpha = Math.acos((triangle.sides[1]**2 + triangle.sides[2]**2 - triangle.sides[0]**2)/(2*triangle.sides[1]*triangle.sides[2]));
    let beta = Math.acos((triangle.sides[0]**2 + triangle.sides[2]**2 - triangle.sides[1]**2)/(2*triangle.sides[0]*triangle.sides[2]));
    let gamma = Math.acos((triangle.sides[0]**2 + triangle.sides[1]**2 - triangle.sides[2]**2)/(2*triangle.sides[0]*triangle.sides[1]));
    
    document.getElementById("alpha").value = alpha
    document.getElementById("beta").value = beta;
    document.getElementById("gamma").value = gamma;
}

//2 Lados, 1 Ángulo (A)
function s2a1a(angleIndex, sideIndex) {
    console.log("Angle Index: " + angleIndex + " - Side Index: " + sideIndex[0] + ", " + sideIndex[1]);
    let side = Math.sqrt(triangle.sides[sideIndex[0]]**2 + triangle.sides[sideIndex[1]]**2 - 2*triangle.sides[sideIndex[0]]*triangle.sides[sideIndex[1]]*Math.cos(triangle.angles[angleIndex]));
    let angle1 = Math.atan( triangle.sides[sideIndex[0]]*Math.sin(triangle.angles[angleIndex]) / (triangle.sides[sideIndex[1]] - Math.cos(triangle.angles[angleIndex])) );
    let angle2 = Math.atan( triangle.sides[sideIndex[1]]*Math.sin(triangle.angles[angleIndex]) / (triangle.sides[sideIndex[0]] - Math.cos(triangle.angles[angleIndex])) );
    
    switch (angleIndex) {
        case 0:
            document.getElementById("aSide").value = side;
            break;
        case 1:
            document.getElementById("bSide").value = side;
            break;
        case 2:
            document.getElementById("cSide").value = side;
            break;
    }

    switch (sideIndex[0]) {
        case 0:
            document.getElementById("alpha").value = angle1;
            break;
        case 1:
            document.getElementById("beta").value = angle1;
            break;
        case 2:
            document.getElementById("gamma").value = angle1;
            break;
    }

    switch (sideIndex[1]) {
        case 0:
            document.getElementById("alpha").value = angle2;
            break;
        case 1:
            document.getElementById("beta").value = angle2;
            break;
        case 2:
            document.getElementById("gamma").value = angle2;
            break;
    }
}

function s2a1b(angleIndex, otherSide) {
    let side = triangle.sides[otherSide]*Math.cos(triangle.angles[angleIndex]) + Math.sqrt(triangle.sides[angleIndex]**2 - (triangle.sides[otherSide]*Math.sin(triangle.angles[angleIndex]))**2);
    let angle1 = Math.asin(triangle.sides[otherSide]*Math.sin(triangle.angles[angleIndex]) / triangle.sides[angleIndex]); 
    let angle2 = Math.PI/2 - triangle.angles[angleIndex] + Math.acos(triangle.sides[otherSide]*Math.sin(triangle.angles[angleIndex])/triangle.sides[angleIndex]);

    switch (0) {
        case otherSide:
            document.getElementById("alpha").value = angle1;
            break;
        case angleIndex:
            break;
        default:
            document.getElementById("alpha").value = angle2;
            document.getElementById("aSide").value = side;
    }

    switch (1) {
        case otherSide:
            document.getElementById("beta").value = angle1;
            break;
        case angleIndex:
            break;
        default:
            document.getElementById("beta").value = angle2;
            document.getElementById("bSide").value = side;
    }
    
    switch (2) {
        case otherSide:
            document.getElementById("gamma").value = angle1;
            break;
        case angleIndex:
            break;
        default:
            document.getElementById("gamma").value = angle2;
            document.getElementById("cSide").value = side;
    }
}

function s1a2(angleIndex, sideIndex) {
    let angle = Math.PI - triangle.angles[angleIndex[0]] - triangle.angles[angleIndex[1]];
    let side1;
    let side2;
    let anglesWithIndex = [document.getElementById("alpha").value, document.getElementById("beta").value, document.getElementById("gamma").value];
    let sidesWithIndex = [document.getElementById("aSide").value, document.getElementById("bSide").value, document.getElementById("cSide").value];

    if (angleIndex[0] === sideIndex) {
        side1 = triangle.sides[sideIndex]*Math.sin(angleIndex[1])/(Math.sin(angleIndex[0]));
        side2 = (triangle.sides[sideIndex]*Math.sin(triangle.angles[angleIndex[1]]))/Math.cos(triangle.angles[angleIndex[0]]) + triangle.sides[sideIndex]*Math.cos(triangle.angles[angleIndex[1]]);

        for (var i = 0; i < 3; i++) {
            switch (i) {
                case angleIndex[0]:
                    break;
                case angleIndex[1]:
                    sidesWithIndex[i] = side1;
                    break;
                default:
                    sidessWithIndex[i] = side2;
                    anglesWithIndex[i] = angle;
                    break;
            }
        }
        
    } else if (angleIndex[1] === sideIndex) {
        side1 = triangle.sides[sideIndex]*Math.sin(angleIndex[0])/(Math.sin(angleIndex[1]));
        side2 = (triangle.sides[sideIndex]*Math.sin(triangle.angles[angleIndex[0]]))/Math.cos(triangle.angles[angleIndex[1]]) + triangle.sides[sideIndex]*Math.cos(triangle.angles[angleIndex[0]]);

        for (var i = 0; i < 3; i++) {
            switch (i) {
                case angleIndex[0]:
                    sidesWithIndex[i] = side1;
                    break;
                case angleIndex[1]:
                    break;
                default:
                    sidessWithIndex[i] = side2;
                    anglesWithIndex[i] = angle;
                    break;
            }
        }

    } else {
        side1 = triangle.sides[sideIndex]*Math.sin(triangle.angles[angleIndex[0]])/Math.sin(angle);
        side2 = triangle.sides[sideIndex]*Math.sin(triangle.angles[angleIndex[1]])/Math.sin(angle);

        for (var i = 0; i < 3; i++) {
            switch (i) {
                case sideIndex:
                    angleIndex[i] = angle;
                    break;
                case angleIndex[0]:
                    sideIndex[i] = side1;
                    break;
                case angleIndex[1]:
                    sideIndex[i] = side2;
                    break;
            }
        }
    }
}

//Not possible
function impossible() {
    console.log("No posible");
    document.getElementsByClassName("imposible")[0].style.display = "block";
}