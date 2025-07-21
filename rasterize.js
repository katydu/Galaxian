/* GLOBAL CONSTANTS AND VARIABLES */
/* assignment specific globals */
var makeYourOwn = false;
let aliens = [];
let spaceship = [];
let bullets = [];
let bullet_id_cnt = 0;
let shaderProgram;
let spaceship_position = [];
var defaultEye = vec3.fromValues(0,0,1.5); // default eye position in world space
var defaultCenter = vec3.fromValues(0,0,1); // default view direction in world space
var defaultUp = vec3.fromValues(0,1,0); // default view up vector
var lightAmbient = vec3.fromValues(1,1,1); // default light ambient emission
var lightDiffuse = vec3.fromValues(1,1,1); // default light diffuse emission
var lightSpecular = vec3.fromValues(1,1,1); // default light specular emission
var lightPosition = vec3.fromValues(0,0,1); // default light position
var rotateTheta = Math.PI/50; // how much to rotate models by with each key press
var collideSound = new Audio("boom.mp3");
var music = new Audio("music_zapsplat_easy_cheesy.mp3");
/* webgl and geometry data */
var gl = null; // the all powerful gl object. It's all here folks!
var inputTriangles = [{"material": {"ambient": [0.9,0.5,0.5], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":17}, 
"vertices": [
    [-0.25, 0.75, 0.55],[-0.25, 0.8, 0.55],[-0.05, 0.8, 0.55],[-0.05, 0.75, 0.55],
    [-0.25, 0.75, 0.55],[-0.05, 0.75, 0.55],[-0.05, 0.75, 0.6],[-0.25, 0.75, 0.6],
    [-0.05, 0.8, 0.55], [-0.05, 0.75, 0.55],[-0.05, 0.75, 0.6],[-0.05, 0.8, 0.6],
    [-0.25, 0.8, 0.55],[-0.05, 0.8, 0.55],[-0.05, 0.8, 0.6],[-0.25, 0.8, 0.6],
    [-0.25, 0.75, 0.55],[-0.25, 0.8, 0.55],[-0.25, 0.8, 0.6],[-0.25, 0.75, 0.6],
    [-0.25, 0.75, 0.6],[-0.25, 0.8, 0.6],[-0.05, 0.8, 0.6],[-0.05, 0.75, 0.6],
],
"normals": [
    [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
    [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
    [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
    [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
    [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
    [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
    [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]
],
"triangles": [
    [0, 1, 2], [2, 3, 0], 
    [4, 5, 6], [6, 7, 4], 
    [8, 9, 10], [10, 11, 8], 
    [12, 13, 14], [14, 15, 12], 
    [16, 17, 18], [18, 19, 16], 
    [20, 21, 22], [22, 23, 20], 
]}, 
                        {"material": {"ambient": [0.0,1.0,1.0], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":17}, 
                        "vertices": [
                            [-0.75, 0.75, 0.55],[-0.75, 0.8, 0.55],[-0.55, 0.8, 0.55],[-0.55, 0.75, 0.55],
                            [-0.75, 0.75, 0.55],[-0.55, 0.75, 0.55],[-0.55, 0.75, 0.6],[-0.75, 0.75, 0.6],
                            [-0.55, 0.8, 0.55], [-0.55, 0.75, 0.55],[-0.55, 0.75, 0.6],[-0.55, 0.8, 0.6],
                            [-0.75, 0.8, 0.55],[-0.55, 0.8, 0.55],[-0.55, 0.8, 0.6],[-0.75, 0.8, 0.6],
                            [-0.75, 0.75, 0.55],[-0.75, 0.8, 0.55],[-0.75, 0.8, 0.6],[-0.75, 0.75, 0.6],
                            [-0.75, 0.75, 0.6],[-0.75, 0.8, 0.6],[-0.55, 0.8, 0.6],[-0.55, 0.75, 0.6],
                        ],
                        "normals": [
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
                            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
                            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
                            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]
                        ],
                        "triangles": [
                            [0, 1, 2], [2, 3, 0], 
                            [4, 5, 6], [6, 7, 4], 
                            [8, 9, 10], [10, 11, 8], 
                            [12, 13, 14], [14, 15, 12], 
                            [16, 17, 18], [18, 19, 16], 
                            [20, 21, 22], [22, 23, 20], 
                        ]}, 
                        {"material": {"ambient": [1.0,1.0,1.0], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":17}, 
                        "vertices": [
                            [-0.50, 0.75, 0.55],[-0.50, 0.8, 0.55],[-0.30, 0.8, 0.55],[-0.30, 0.75, 0.55],
                            [-0.50, 0.75, 0.55],[-0.30, 0.75, 0.55],[-0.30, 0.75, 0.6],[-0.50, 0.75, 0.6],
                            [-0.30, 0.8, 0.55], [-0.30, 0.75, 0.55],[-0.30, 0.75, 0.6],[-0.30, 0.8, 0.6],
                            [-0.50, 0.8, 0.55],[-0.30, 0.8, 0.55],[-0.30, 0.8, 0.6],[-0.50, 0.8, 0.6],
                            [-0.50, 0.75, 0.55],[-0.50, 0.8, 0.55],[-0.50, 0.8, 0.6],[-0.50, 0.75, 0.6],
                            [-0.50, 0.75, 0.6],[-0.50, 0.8, 0.6],[-0.30, 0.8, 0.6],[-0.30, 0.75, 0.6],
                        ],
                        "normals": [
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
                            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
                            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
                            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]
                        ],
                        "triangles": [
                            [0, 1, 2], [2, 3, 0], 
                            [4, 5, 6], [6, 7, 4], 
                            [8, 9, 10], [10, 11, 8], 
                            [12, 13, 14], [14, 15, 12], 
                            [16, 17, 18], [18, 19, 16], 
                            [20, 21, 22], [22, 23, 20], 
                        ]},
                        {"material": {"ambient": [1.0,1.0,1.0], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":17}, 
                        "vertices": [
                            [-0.25, 0.75, 0.55],[-0.25, 0.8, 0.55],[-0.05, 0.8, 0.55],[-0.05, 0.75, 0.55],
                            [-0.25, 0.75, 0.55],[-0.05, 0.75, 0.55],[-0.05, 0.75, 0.6],[-0.25, 0.75, 0.6],
                            [-0.05, 0.8, 0.55], [-0.05, 0.75, 0.55],[-0.05, 0.75, 0.6],[-0.05, 0.8, 0.6],
                            [-0.25, 0.8, 0.55],[-0.05, 0.8, 0.55],[-0.05, 0.8, 0.6],[-0.25, 0.8, 0.6],
                            [-0.25, 0.75, 0.55],[-0.25, 0.8, 0.55],[-0.25, 0.8, 0.6],[-0.25, 0.75, 0.6],
                            [-0.25, 0.75, 0.6],[-0.25, 0.8, 0.6],[-0.05, 0.8, 0.6],[-0.05, 0.75, 0.6],
                        ],
                        "normals": [
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
                            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
                            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
                            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]
                        ],
                        "triangles": [
                            [0, 1, 2], [2, 3, 0], 
                            [4, 5, 6], [6, 7, 4], 
                            [8, 9, 10], [10, 11, 8], 
                            [12, 13, 14], [14, 15, 12], 
                            [16, 17, 18], [18, 19, 16], 
                            [20, 21, 22], [22, 23, 20], 
                        ]}, {"material": {"ambient": [1.0,1.0,1.0], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":17}, 
                        "vertices": [
                            [0.00, 0.75, 0.55],[0.00, 0.8, 0.55],[0.20, 0.8, 0.55],[0.20, 0.75, 0.55],
                            [0.00, 0.75, 0.55],[0.20, 0.75, 0.55],[0.20, 0.75, 0.6],[0.00, 0.75, 0.6],
                            [0.20, 0.8, 0.55], [0.20, 0.75, 0.55],[0.20, 0.75, 0.6],[0.20, 0.8, 0.6],
                            [0.00, 0.8, 0.55],[0.20, 0.8, 0.55],[0.20, 0.8, 0.6],[0.00, 0.8, 0.6],
                            [0.00, 0.75, 0.55],[0.00, 0.8, 0.55],[0.00, 0.8, 0.6],[0.00, 0.75, 0.6],
                            [0.00, 0.75, 0.6],[0.00, 0.8, 0.6],[0.20, 0.8, 0.6],[0.20, 0.75, 0.6],
                        ],
                        "normals": [
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
                            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
                            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
                            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]
                        ],
                        "triangles": [
                            [0, 1, 2], [2, 3, 0], 
                            [4, 5, 6], [6, 7, 4], 
                            [8, 9, 10], [10, 11, 8], 
                            [12, 13, 14], [14, 15, 12], 
                            [16, 17, 18], [18, 19, 16], 
                            [20, 21, 22], [22, 23, 20], 
                        ]}, {"material": {"ambient": [1.0,1.0,1.0], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":17}, 
                        "vertices": [
                            [0.25, 0.75, 0.55],[0.25, 0.8, 0.55],[0.45, 0.8, 0.55],[0.45, 0.75, 0.55],
                            [0.25, 0.75, 0.55],[0.45, 0.75, 0.55],[0.45, 0.75, 0.6],[0.25, 0.75, 0.6],
                            [0.45, 0.8, 0.55], [0.45, 0.75, 0.55],[0.45, 0.75, 0.6],[0.45, 0.8, 0.6],
                            [0.25, 0.8, 0.55],[0.45, 0.8, 0.55],[0.45, 0.8, 0.6],[0.25, 0.8, 0.6],
                            [0.25, 0.75, 0.55],[0.25, 0.8, 0.55],[0.25, 0.8, 0.6],[0.25, 0.75, 0.6],
                            [0.25, 0.75, 0.6],[0.25, 0.8, 0.6],[0.45, 0.8, 0.6],[0.45, 0.75, 0.6],
                        ],
                        "normals": [
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
                            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
                            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
                            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]
                        ],
                        "triangles": [
                            [0, 1, 2], [2, 3, 0], 
                            [4, 5, 6], [6, 7, 4], 
                            [8, 9, 10], [10, 11, 8], 
                            [12, 13, 14], [14, 15, 12], 
                            [16, 17, 18], [18, 19, 16], 
                            [20, 21, 22], [22, 23, 20], 
                        ]}, {"material": {"ambient": [1.0,1.0,1.0], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":17}, 
                        "vertices": [
                            [0.50, 0.75, 0.55],[0.50, 0.8, 0.55],[0.70, 0.8, 0.55],[0.70, 0.75, 0.55],
                            [0.50, 0.75, 0.55],[0.70, 0.75, 0.55],[0.70, 0.75, 0.6],[0.50, 0.75, 0.6],
                            [0.70, 0.8, 0.55], [0.70, 0.75, 0.55],[0.70, 0.75, 0.6],[0.70, 0.8, 0.6],
                            [0.50, 0.8, 0.55],[0.70, 0.8, 0.55],[0.70, 0.8, 0.6],[0.50, 0.8, 0.6],
                            [0.50, 0.75, 0.55],[0.50, 0.8, 0.55],[0.50, 0.8, 0.6],[0.50, 0.75, 0.6],
                            [0.50, 0.75, 0.6],[0.50, 0.8, 0.6],[0.70, 0.8, 0.6],[0.70, 0.75, 0.6],
                        ],
                        "normals": [
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
                            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
                            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
                            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]
                        ],
                        "triangles": [
                            [0, 1, 2], [2, 3, 0], 
                            [4, 5, 6], [6, 7, 4], 
                            [8, 9, 10], [10, 11, 8], 
                            [12, 13, 14], [14, 15, 12], 
                            [16, 17, 18], [18, 19, 16], 
                            [20, 21, 22], [22, 23, 20], 
                        ]}, {"material": {"ambient": [1.0,1.0,1.0], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":17}, 
                        "vertices": [
                            [-0.75, 0.65, 0.55],[-0.75, 0.7, 0.55],[-0.55, 0.7, 0.55],[-0.55, 0.65, 0.55],
                            [-0.75, 0.65, 0.55],[-0.55, 0.65, 0.55],[-0.55, 0.65, 0.6],[-0.75, 0.65, 0.6],
                            [-0.55, 0.7, 0.55], [-0.55, 0.65, 0.55],[-0.55, 0.65, 0.6],[-0.55, 0.7, 0.6],
                            [-0.75, 0.7, 0.55],[-0.55, 0.7, 0.55],[-0.55, 0.7, 0.6],[-0.75, 0.7, 0.6],
                            [-0.75, 0.65, 0.55],[-0.75, 0.7, 0.55],[-0.75, 0.7, 0.6],[-0.75, 0.65, 0.6],
                            [-0.75, 0.65, 0.6],[-0.75, 0.7, 0.6],[-0.55, 0.7, 0.6],[-0.55, 0.65, 0.6],
                        ],
                        "normals": [
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
                            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
                            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
                            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]
                        ],
                        "triangles": [
                            [0, 1, 2], [2, 3, 0], 
                            [4, 5, 6], [6, 7, 4], 
                            [8, 9, 10], [10, 11, 8], 
                            [12, 13, 14], [14, 15, 12], 
                            [16, 17, 18], [18, 19, 16], 
                            [20, 21, 22], [22, 23, 20], 
                        ]}, 
                        {"material": {"ambient": [1.0,1.0,1.0], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":17}, 
                        "vertices": [
                            [-0.50, 0.65, 0.55],[-0.50, 0.7, 0.55],[-0.30, 0.7, 0.55],[-0.30, 0.65, 0.55],
                            [-0.50, 0.65, 0.55],[-0.30, 0.65, 0.55],[-0.30, 0.65, 0.6],[-0.50, 0.65, 0.6],
                            [-0.30, 0.7, 0.55], [-0.30, 0.65, 0.55],[-0.30, 0.65, 0.6],[-0.30, 0.7, 0.6],
                            [-0.50, 0.7, 0.55],[-0.30, 0.7, 0.55],[-0.30, 0.7, 0.6],[-0.50, 0.7, 0.6],
                            [-0.50, 0.65, 0.55],[-0.50, 0.7, 0.55],[-0.50, 0.7, 0.6],[-0.50, 0.65, 0.6],
                            [-0.50, 0.65, 0.6],[-0.50, 0.7, 0.6],[-0.30, 0.7, 0.6],[-0.30, 0.65, 0.6],
                        ],
                        "normals": [
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
                            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
                            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
                            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]
                        ],
                        "triangles": [
                            [0, 1, 2], [2, 3, 0], 
                            [4, 5, 6], [6, 7, 4], 
                            [8, 9, 10], [10, 11, 8], 
                            [12, 13, 14], [14, 15, 12], 
                            [16, 17, 18], [18, 19, 16], 
                            [20, 21, 22], [22, 23, 20], 
                        ]}, {"material": {"ambient": [1.0,1.0,1.0], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":17}, 
                        "vertices": [
                            [-0.25, 0.65, 0.55],[-0.25, 0.7, 0.55],[-0.05, 0.7, 0.55],[-0.05, 0.65, 0.55],
                            [-0.25, 0.65, 0.55],[-0.05, 0.65, 0.55],[-0.05, 0.65, 0.6],[-0.25, 0.65, 0.6],
                            [-0.05, 0.7, 0.55], [-0.05, 0.65, 0.55],[-0.05, 0.65, 0.6],[-0.05, 0.7, 0.6],
                            [-0.25, 0.7, 0.55],[-0.05, 0.7, 0.55],[-0.05, 0.7, 0.6],[-0.25, 0.7, 0.6],
                            [-0.25, 0.65, 0.55],[-0.25, 0.7, 0.55],[-0.25, 0.7, 0.6],[-0.25, 0.65, 0.6],
                            [-0.25, 0.65, 0.6],[-0.25, 0.7, 0.6],[-0.05, 0.7, 0.6],[-0.05, 0.65, 0.6],
                        ],
                        "normals": [
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
                            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
                            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
                            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]
                        ],
                        "triangles": [
                            [0, 1, 2], [2, 3, 0], 
                            [4, 5, 6], [6, 7, 4], 
                            [8, 9, 10], [10, 11, 8], 
                            [12, 13, 14], [14, 15, 12], 
                            [16, 17, 18], [18, 19, 16], 
                            [20, 21, 22], [22, 23, 20], 
                        ]},{"material": {"ambient": [1.0,1.0,1.0], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":17}, 
                        "vertices": [
                            [0.00, 0.65, 0.55],[0.00, 0.7, 0.55],[0.20, 0.7, 0.55],[0.20, 0.65, 0.55],
                            [0.00, 0.65, 0.55],[0.20, 0.65, 0.55],[0.20, 0.65, 0.6],[0.00, 0.65, 0.6],
                            [0.20, 0.7, 0.55], [0.20, 0.65, 0.55],[0.20, 0.65, 0.6],[0.20, 0.7, 0.6],
                            [0.00, 0.7, 0.55],[0.20, 0.7, 0.55],[0.20, 0.7, 0.6],[0.00, 0.7, 0.6],
                            [0.00, 0.65, 0.55],[0.00, 0.7, 0.55],[0.00, 0.7, 0.6],[0.00, 0.65, 0.6],
                            [0.00, 0.65, 0.6],[0.00, 0.7, 0.6],[0.20, 0.7, 0.6],[0.20, 0.65, 0.6],
                        ],
                        "normals": [
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
                            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
                            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
                            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]
                        ],
                        "triangles": [
                            [0, 1, 2], [2, 3, 0], 
                            [4, 5, 6], [6, 7, 4], 
                            [8, 9, 10], [10, 11, 8], 
                            [12, 13, 14], [14, 15, 12], 
                            [16, 17, 18], [18, 19, 16], 
                            [20, 21, 22], [22, 23, 20], 
                        ]}, {"material": {"ambient": [1.0,1.0,1.0], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":17}, 
                        "vertices": [
                            [0.25, 0.65, 0.55],[0.25, 0.7, 0.55],[0.45, 0.7, 0.55],[0.45, 0.65, 0.55],
                            [0.25, 0.65, 0.55],[0.45, 0.65, 0.55],[0.45, 0.65, 0.6],[0.25, 0.65, 0.6],
                            [0.45, 0.7, 0.55], [0.45, 0.65, 0.55],[0.45, 0.65, 0.6],[0.45, 0.7, 0.6],
                            [0.25, 0.7, 0.55],[0.45, 0.7, 0.55],[0.45, 0.7, 0.6],[0.25, 0.7, 0.6],
                            [0.25, 0.65, 0.55],[0.25, 0.7, 0.55],[0.25, 0.7, 0.6],[0.25, 0.65, 0.6],
                            [0.25, 0.65, 0.6],[0.25, 0.7, 0.6],[0.45, 0.7, 0.6],[0.45, 0.65, 0.6],
                        ],
                        "normals": [
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
                            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
                            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
                            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]
                        ],
                        "triangles": [
                            [0, 1, 2], [2, 3, 0], 
                            [4, 5, 6], [6, 7, 4], 
                            [8, 9, 10], [10, 11, 8], 
                            [12, 13, 14], [14, 15, 12], 
                            [16, 17, 18], [18, 19, 16], 
                            [20, 21, 22], [22, 23, 20], 
                        ]}, {"material": {"ambient": [1.0,1.0,1.0], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":17}, 
                        "vertices": [
                            [0.50, 0.65, 0.55],[0.50, 0.7, 0.55],[0.70, 0.7, 0.55],[0.70, 0.65, 0.55],
                            [0.50, 0.65, 0.55],[0.70, 0.65, 0.55],[0.70, 0.65, 0.6],[0.50, 0.65, 0.6],
                            [0.70, 0.7, 0.55], [0.70, 0.65, 0.55],[0.70, 0.65, 0.6],[0.70, 0.7, 0.6],
                            [0.50, 0.7, 0.55],[0.70, 0.7, 0.55],[0.70, 0.7, 0.6],[0.50, 0.7, 0.6],
                            [0.50, 0.65, 0.55],[0.50, 0.7, 0.55],[0.50, 0.7, 0.6],[0.50, 0.65, 0.6],
                            [0.50, 0.65, 0.6],[0.50, 0.7, 0.6],[0.70, 0.7, 0.6],[0.70, 0.65, 0.6],
                        ],
                        "normals": [
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
                            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
                            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
                            [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
                            [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]
                        ],
                        "triangles": [
                            [0, 1, 2], [2, 3, 0], 
                            [4, 5, 6], [6, 7, 4], 
                            [8, 9, 10], [10, 11, 8], 
                            [12, 13, 14], [14, 15, 12], 
                            [16, 17, 18], [18, 19, 16], 
                            [20, 21, 22], [22, 23, 20], 
                        ]}] // the triangle data as loaded from input files

const bulletTriangle = {
    material: {"ambient": [0.9, 0.9, 0.0], "diffuse": [1.0, 1.0, 0.0], "specular": [1, 1, 0.1], "n": 15},
    vertices: [
        [0.0, 0.0, 0.0],  // Vertex 0
        [0.04, 0.0, 0.0],  // Vertex 1
        [0.02, 0.04, 0.0]  // Vertex 2
    ],
    
    normals:[
        [0.0, 0.0, 1.0],  // Normal for Vertex 0
        [0.0, 0.0, 1.0],  // Normal for Vertex 1
        [0.0, 0.0, 1.0]   // Normal for Vertex 2
    ],
    
    triangles: [
        [0, 1, 2]  // Single triangle
    ]
}

var bulletVertexBuffer, bulletNormalBuffer, bulletIndexBuffer; // Add these global variables

class Bullet {
    constructor(position, velocity) {
        this.position = vec3.clone(position);  // Starting position of the bullet
        this.velocity = vec3.clone(velocity);  // Velocity vector for movement
        this.alive = true;  // Is the bullet still alive?
        this.material = bulletTriangle.material;  // Material properties of the bullet
        // Based on initial vertices of the triangle and the current position, calculate the center
        this.center = calculateCenter(bulletTriangle.vertices);
        this.id = bullet_id_cnt++;
    }

    // Update the bullet's position based on velocity
    update() {
        if (this.alive) {
            vec3.add(this.position, this.position, this.velocity);  // Update the position by velocity
            this.center = vec3.add(vec3.create(), this.center, this.position);
        }
    }

    // Check if the bullet is out of bounds or needs to be destroyed
    checkBounds() {
        // Example: check if the bullet is too far from the origin (adjust as needed)
        if (this.position[1] > 0.9) {
            this.alive = false;
            return;
        }

        for (let i = 0; i < aliens.length; i++) {
            //console.log(aliens)
            if (checkCollision(aliens[i], undefined, this)) {
                scoreVal += 1;
                document.getElementById("score").innerHTML = " " + scoreVal;

                collideSound.play();
                this.alive = false;
                // remove alien from aliens array
                aliens.splice(i, 1);

                // also remove the bullet by id
                for (let j = 0; j < bullets.length; j++) {
                    if (bullets[j].id === this.id) {
                        bullets.splice(j, 1);
                    }
                }
                break;
            }
        }
    }

    // Render the bullet using the current position
    render(gl, umMatrixLocation, upvmMatrixLocation, mMatrix, pvMatrix) {
        if (!this.alive) return;

        // Create a model matrix for this bullet's position
        mat4.identity(mMatrix);
        mat4.translate(mMatrix, mMatrix, this.position); // Move the bullet to its position
        
        // Send uniform data (bullet position) to shaders
        gl.uniformMatrix4fv(umMatrixLocation, false, mMatrix);

        // Send combined model-view-projection matrix
        const pvmMatrix = mat4.create();
        mat4.multiply(pvmMatrix, pvMatrix, mMatrix);  // Multiply for final projection-view-model matrix
        gl.uniformMatrix4fv(upvmMatrixLocation, false, pvmMatrix);     

        // Set material properties for the bullet
        gl.uniform3fv(ambientULoc, bulletTriangle.material.ambient);
        gl.uniform3fv(diffuseULoc, bulletTriangle.material.diffuse);
        gl.uniform3fv(specularULoc, bulletTriangle.material.specular);
        gl.uniform1f(shininessULoc, bulletTriangle.material.n);

        // Bind bullet buffers and set up attributes
        gl.bindBuffer(gl.ARRAY_BUFFER, bulletVertexBuffer);
        gl.vertexAttribPointer(vPosAttribLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosAttribLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, bulletNormalBuffer);
        gl.vertexAttribPointer(vNormAttribLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vNormAttribLoc);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bulletIndexBuffer);

        // Render the bullet
        gl.drawElements(gl.TRIANGLES, bulletTriangle.triangles.length * 3, gl.UNSIGNED_SHORT, 0);
    }
}

function fireBullet(initialPosition) {
    console.log(initialPosition, "initialPosition")
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].alive) {
            console.log("Bullet already exists!");
            return;
        }
    }
    const spaceshipPosition = vec3.fromValues(initialPosition[0], initialPosition[1], initialPosition[2]);  // Starting position of the spaceship
    const bulletVelocity = vec3.fromValues(0, 0.04, 0);  // Speed and direction of the bullet
    const newBullet = new Bullet(spaceshipPosition, bulletVelocity);
    bullets.push(newBullet);
}

var numTriangleSets = 0; // how many triangle sets in input scene
//var inputEllipsoids = [{"x": 0, "y": -0.7, "z": 0.5, "a":0.03, "b":0.03, "c":0.03, "ambient": [0.1,0.1,0.1], "diffuse": [1,1,1], "specular": [0.3,0.3,0.3], "n":9}];
var numEllipsoids = 0; // how many ellipsoids in the input scene
var vertexBuffers = []; // this contains vertex coordinate lists by set, in triples
var normalBuffers = []; // this contains normal component lists by set, in triples
var triSetSizes = []; // this contains the size of each triangle set
var triangleBuffers = []; // lists of indices into vertexBuffers by set, in triples
var viewDelta = 0; // how much to displace view with each key press

/* shader parameter locations */
var vPosAttribLoc; // where to put position for vertex shader
var mMatrixULoc; // where to put model matrix for vertex shader
var pvmMatrixULoc; // where to put project model view matrix for vertex shader
var ambientULoc; // where to put ambient reflecivity for fragment shader
var diffuseULoc; // where to put diffuse reflecivity for fragment shader
var specularULoc; // where to put specular reflecivity for fragment shader
var shininessULoc; // where to put specular exponent for fragment shader

/* interaction variables */
var Eye = vec3.clone(defaultEye); // eye position in world space
var Center = vec3.clone(defaultCenter); // view direction in world space
var Up = vec3.clone(defaultUp); // view up vector in world space

//var ballVelocity = vec3.fromValues(0,0,0);
var score;
var gameOver;
var gameOverText = "";
var scoreVal= 0;
var blocksRemain = inputTriangles.length-1;


// animation
var alienSpeed = 0.008; // Speed of descent

// ASSIGNMENT HELPER FUNCTIONS

// get the JSON file from the passed URL
function getJSONFile(url,descr) {
    try {
        if ((typeof(url) !== "string") || (typeof(descr) !== "string"))
            throw "getJSONFile: parameter not a string";
        else {
            var httpReq = new XMLHttpRequest(); // a new http request
            httpReq.open("GET",url,false); // init the request
            httpReq.send(null); // send the request
            var startTime = Date.now();
            while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
                if ((Date.now()-startTime) > 3000)
                    break;
            } // until its loaded or we time out after three seconds
            if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE))
                throw "Unable to open "+descr+" file!";
            else
                return JSON.parse(httpReq.response); 
        } // end if good params
    } // end try    
    
    catch(e) {
        console.log(e);
        return(String.null);
    }
} // end get input json file

// does stuff when keys are pressed
function handleKeyDown(event) {
    
    const modelEnum = {TRIANGLES: "triangles", ELLIPSOID: "ellipsoid"}; // enumerated model type
    const dirEnum = {NEGATIVE: -1, POSITIVE: 1}; // enumerated rotation direction
    
    function highlightModel(modelType,whichModel) {
        if (handleKeyDown.modelOn != null)
            handleKeyDown.modelOn.on = false;
        handleKeyDown.whichOn = whichModel;
        if (modelType == modelEnum.TRIANGLES)
            handleKeyDown.modelOn = inputTriangles[whichModel]; 
        handleKeyDown.modelOn.on = true; 
    } // end highlight model
    
    function translateModel(offset) {
        if (handleKeyDown.modelOn != null)
            vec3.add(handleKeyDown.modelOn.translation,handleKeyDown.modelOn.translation,offset);
    } // end translate model

    function rotateModel(axis,direction) {
        if (handleKeyDown.modelOn != null) {
            var newRotation = mat4.create();

            mat4.fromRotation(newRotation,direction*rotateTheta,axis); // get a rotation matrix around passed axis
            vec3.transformMat4(handleKeyDown.modelOn.xAxis,handleKeyDown.modelOn.xAxis,newRotation); // rotate model x axis tip
            vec3.transformMat4(handleKeyDown.modelOn.yAxis,handleKeyDown.modelOn.yAxis,newRotation); // rotate model y axis tip
        } // end if there is a highlighted model
    } // end rotate model
    
    // set up needed view params
    var lookAt = vec3.create(), viewRight = vec3.create(), temp = vec3.create(); // lookat, right & temp vectors
    lookAt = vec3.normalize(lookAt,vec3.subtract(temp,Center,Eye)); // get lookat vector
    viewRight = vec3.normalize(viewRight,vec3.cross(temp,lookAt,Up)); // get view right vector
    
    // highlight static variables
    handleKeyDown.whichOn = handleKeyDown.whichOn == undefined ? -1 : handleKeyDown.whichOn; // nothing selected initially
    handleKeyDown.modelOn = handleKeyDown.modelOn == undefined ? null : handleKeyDown.modelOn; // nothing selected initially
    
    switch (event.code) {
        
        // model selection
        case "Space": 
            fireBullet(spaceship_position);
            break;
        case "ArrowRight": // select next triangle set
            inputTriangles[0].translation[0] += 0.07;
            spaceship_position[0] += 0.07;
            music.play();
            break;
        case "ArrowLeft": // select previous triangle set
            inputTriangles[0].translation[0] -= 0.07;
            spaceship_position[0] -= 0.07;
            music.play();
            break;
        case "Digit1":
            if (event.getModifierState("Shift")){
                makeYourOwn = !makeYourOwn;
                main();
            }
            break;
    } // end switch
} // end handleKeyDown

function getRandomFloat(min, max) {
    const str = (Math.random() * (max - min) + min);
    return parseFloat(str);
}
// set up the webGL environment
function setupWebGL() {
    
    // Set up keys
    document.onkeydown = handleKeyDown; // call this when key pressed

    var imageCanvas = document.getElementById("myImageCanvas"); // create a 2d canvas
      var cw = imageCanvas.width, ch = imageCanvas.height; 
      imageContext = imageCanvas.getContext("2d"); 

     
    // Get the canvas and context
    var canvas = document.getElementById("myWebGLCanvas"); // create a js canvas
    gl = canvas.getContext("webgl"); // get a webgl object from it
    var scoreCanvas = document.getElementById("score");
    score = document.createTextNode("");
    scoreCanvas.appendChild(score);

    var gameOverCanvas = document.getElementById("over");
    gameOver = document.createTextNode("");
    gameOverCanvas.appendChild(gameOver);
    try {
      if (gl == null) {
        throw "unable to create gl context -- is your browser gl ready?";
      } else {
        //gl.clearColor(0.0, 0.0, 0.0, 1.0); // use black when we clear the frame buffer
        gl.clearDepth(1.0); // use max when we clear the depth buffer
        gl.enable(gl.DEPTH_TEST); // use hidden surface removal (with zbuffering)
      }
    } // end try
    
    catch(e) {
      console.log(e);
    } // end catch
 
} // end setupWebGL

// read models in, load them into webgl buffers
function calculateCenter(vertices) {
    let center = vec3.create();
    vertices.forEach(vertex => {
        vec3.add(center, center, vertex);
    });
    vec3.scale(center, center, 1 / vertices.length);
    return center;
}

function loadModels() {
    
    try {
        // Initialize bullet buffers
        bulletVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bulletVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bulletTriangle.vertices.flat()), gl.STATIC_DRAW);

        bulletNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bulletNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bulletTriangle.normals.flat()), gl.STATIC_DRAW);

        bulletIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bulletIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(bulletTriangle.triangles.flat()), gl.STATIC_DRAW);
        if (inputTriangles == String.null)
            throw "Unable to load triangles file!";
        else {
            // Do the translate and scale first to the spaceship
            //const scaleFactor = 0.1; // Scale down by 0.1
            //const rotationAngle = Math.PI / 2; // Rotate 90 degrees

            // // Create scaling, rotation, and translation matrices
            // const scaleMatrix = mat4.create();
            // const rotationMatrix = mat4.create();
            // const translationMatrix = mat4.create();
            // mat4.fromTranslation(translationMatrix, vec3.fromValues(0.15, -0.6, 0)); // Translate to the origin
            // mat4.fromScaling(scaleMatrix, [-scaleFactor, -scaleFactor, scaleFactor]); // Scale down with negative x, y for mirroring
            // mat4.fromXRotation(rotationMatrix, rotationAngle); // Rotate 90 degrees around the X-axis

            // // Combine transformations: translation -> scaling -> rotation
            // const transformationMatrix = mat4.create();
            // mat4.multiply(transformationMatrix, translationMatrix, scaleMatrix); // translation * scale
            // mat4.multiply(transformationMatrix, transformationMatrix, rotationMatrix); // (translation * scale) * rotation

            // // Apply to spaceship vertices
            // inputTriangles[0].vertices.forEach((vertex, index) => {
            //     const vec = vec4.fromValues(...vertex, 1); // Homogeneous coordinates
            //     vec4.transformMat4(vec, vec, transformationMatrix); // Apply the transformation
            //     inputTriangles[0].vertices[index] = [vec[0], vec[1], vec[2]]; // Update vertex
            // });


            var whichSetVert; // index of vertex in current triangle set
            var whichSetTri; // index of triangle in current triangle set
            var vtxToAdd; // vtx coords to add to the coord array
            var normToAdd; // vtx normal to add to the coord array
            var triToAdd; // tri indices to add to the index array
            var maxCorner = vec3.fromValues(Number.MIN_VALUE,Number.MIN_VALUE,Number.MIN_VALUE); // bbox corner
            var minCorner = vec3.fromValues(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE); // other corner
        
            // process each triangle set to load webgl vertex and triangle buffers
            numTriangleSets = inputTriangles.length; // remember how many tri sets
            for (var whichSet=0; whichSet<numTriangleSets; whichSet++) { // for each tri set
                //console.log(inputTriangles[whichSet]);
                // set up hilighting, modeling translation and rotation
                inputTriangles[whichSet].center = vec3.fromValues(0,0,0);  // center point of tri set
                inputTriangles[whichSet].on = false; // not highlighted
                inputTriangles[whichSet].translation = vec3.fromValues(0,0,0); // no translation
                inputTriangles[whichSet].xAxis = vec3.fromValues(1,0,0); // model X axis
                inputTriangles[whichSet].yAxis = vec3.fromValues(0,1,0); // model Y axis 
                
                //console.log(aliens);
                // set up the vertex and normal arrays, define model center and axes
                inputTriangles[whichSet].glVertices = []; // flat coord list for webgl
                inputTriangles[whichSet].glNormals = []; // flat normal list for webgl
                var numVerts = inputTriangles[whichSet].vertices.length; // num vertices in tri set
                for (whichSetVert=0; whichSetVert<numVerts; whichSetVert++) { // verts in set
                    vtxToAdd = inputTriangles[whichSet].vertices[whichSetVert]; // get vertex to add
                    inputTriangles[whichSet].glVertices.push(vtxToAdd[0],vtxToAdd[1],vtxToAdd[2]); // put coords in set coord list
                    vec3.max(maxCorner,maxCorner,vtxToAdd); // update world bounding box corner maxima
                    vec3.min(minCorner,minCorner,vtxToAdd); // update world bounding box corner minima
                    vec3.add(inputTriangles[whichSet].center,inputTriangles[whichSet].center,vtxToAdd); // add to ctr sum
                } // end for vertices in set
                vertexBuffers[whichSet] = gl.createBuffer(); // init empty webgl set vertex coord buffer
                gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(inputTriangles[whichSet].glVertices),gl.STATIC_DRAW); // data in
                
                var numNorm = inputTriangles[whichSet].normals.length;
                for (var whichSetNorm = 0; whichSetNorm < numNorm; whichSetNorm++) {
                    normToAdd = inputTriangles[whichSet].normals[whichSetNorm];
                    inputTriangles[whichSet].glNormals.push(normToAdd[0],normToAdd[1],normToAdd[2]);
                }
                vec3.scale(inputTriangles[whichSet].center,inputTriangles[whichSet].center,1/numVerts); // avg ctr sum

                // send the vertex coords and normals to webGL
                
                normalBuffers[whichSet] = gl.createBuffer(); // init empty webgl set normal component buffer
                gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(inputTriangles[whichSet].glNormals),gl.STATIC_DRAW); // data in
            
                // set up the triangle index array, adjusting indices across sets
                inputTriangles[whichSet].glTriangles = []; // flat index list for webgl
                triSetSizes[whichSet] = inputTriangles[whichSet].triangles.length; // number of tris in this set
                for (whichSetTri=0; whichSetTri<triSetSizes[whichSet]; whichSetTri++) {
                    triToAdd = inputTriangles[whichSet].triangles[whichSetTri]; // get tri to add
                    inputTriangles[whichSet].glTriangles.push(triToAdd[0],triToAdd[1],triToAdd[2]); // put indices in set list
                } // end for triangles in set

                // send the triangle indices to webGL
                triangleBuffers.push(gl.createBuffer()); // init empty triangle index buffer
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(inputTriangles[whichSet].glTriangles),gl.STATIC_DRAW); // data in

            } // end for each triangle set 
        
           
        } // end if triangle file loaded
        aliens = inputTriangles.slice(1); 
        spaceship = inputTriangles[0];
        const initial_spaceship_position = [0.15, -1.5, 0.0];
        spaceship_position = calculateCenter(spaceship.vertices);
        spaceship.translation = vec3.fromValues(initial_spaceship_position[0], initial_spaceship_position[1], initial_spaceship_position[2]);

        // Update spaceship_position after translation
        vec3.add(spaceship_position, spaceship_position, spaceship.translation);
    } // end try 
    
    catch(e) {
        console.log(e);
    } // end catch
} // end load models

// setup the webGL shaders
function setupShaders() {
    
    // define vertex shader in essl using es6 template strings
    var vShaderCode = `
        attribute vec3 aVertexPosition; // vertex position
        attribute vec3 aVertexNormal; // vertex normal
        
        uniform mat4 umMatrix; // the model matrix
        uniform mat4 upvmMatrix; // the project view model matrix
        
        varying vec3 vWorldPos; // interpolated world position of vertex
        varying vec3 vVertexNormal; // interpolated normal for frag shader

        void main(void) {
            
            // vertex position
            vec4 vWorldPos4 = umMatrix * vec4(aVertexPosition, 1.0);
            vWorldPos = vec3(vWorldPos4.x,vWorldPos4.y,vWorldPos4.z);
            gl_Position = upvmMatrix * vec4(aVertexPosition, 1.0);

            // vertex normal (assume no non-uniform scale)
            vec4 vWorldNormal4 = umMatrix * vec4(aVertexNormal, 0.0);
            vVertexNormal = normalize(vec3(vWorldNormal4.x,vWorldNormal4.y,vWorldNormal4.z)); 
        }
    `;
    
    // define fragment shader in essl using es6 template strings
    var fShaderCode = `
        precision mediump float; // set float to medium precision

        // eye location
        uniform vec3 uEyePosition; // the eye's position in world
        
        // light properties
        uniform vec3 uLightAmbient; // the light's ambient color
        uniform vec3 uLightDiffuse; // the light's diffuse color
        uniform vec3 uLightSpecular; // the light's specular color
        uniform vec3 uLightPosition; // the light's position
        
        // material properties
        uniform vec3 uAmbient; // the ambient reflectivity
        uniform vec3 uDiffuse; // the diffuse reflectivity
        uniform vec3 uSpecular; // the specular reflectivity
        uniform float uShininess; // the specular exponent
        
        // geometry properties
        varying vec3 vWorldPos; // world xyz of fragment
        varying vec3 vVertexNormal; // normal of fragment
            
        void main(void) {
        
            // ambient term
            vec3 ambient = uAmbient*uLightAmbient; 
            
            // diffuse term
            vec3 normal = normalize(vVertexNormal); 
            vec3 light = normalize(uLightPosition - vWorldPos);
            float lambert = max(0.0,dot(normal,light));
            vec3 diffuse = uDiffuse*uLightDiffuse*lambert; // diffuse term
            
            // specular term
            vec3 eye = normalize(uEyePosition - vWorldPos);
            vec3 halfVec = normalize(light+eye);
            float highlight = pow(max(0.0,dot(normal,halfVec)),uShininess);
            vec3 specular = uSpecular*uLightSpecular*highlight; // specular term
            
            // combine to output color
            vec3 colorOut = ambient + diffuse + specular; // no specular yet
            gl_FragColor = vec4(colorOut, 1.0); 
        }
    `;
    
    try {
        var fShader = gl.createShader(gl.FRAGMENT_SHADER); // create frag shader
        gl.shaderSource(fShader,fShaderCode); // attach code to shader
        gl.compileShader(fShader); // compile the code for gpu execution

        var vShader = gl.createShader(gl.VERTEX_SHADER); // create vertex shader
        gl.shaderSource(vShader,vShaderCode); // attach code to shader
        gl.compileShader(vShader); // compile the code for gpu execution
            
        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) { // bad frag shader compile
            throw "error during fragment shader compile: " + gl.getShaderInfoLog(fShader);  
            gl.deleteShader(fShader);
        } else if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) { // bad vertex shader compile
            throw "error during vertex shader compile: " + gl.getShaderInfoLog(vShader);  
            gl.deleteShader(vShader);
        } else { // no compile errors
            shaderProgram = gl.createProgram(); // create the single shader program
            gl.attachShader(shaderProgram, fShader); // put frag shader in program
            gl.attachShader(shaderProgram, vShader); // put vertex shader in program
            gl.linkProgram(shaderProgram); // link program into gl context

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) { // bad program link
                throw "error during shader program linking: " + gl.getProgramInfoLog(shaderProgram);
            } else { // no shader program link errors
                gl.useProgram(shaderProgram); // activate shader program (frag and vert)
                
                // locate and enable vertex attributes
                vPosAttribLoc = gl.getAttribLocation(shaderProgram, "aVertexPosition"); // ptr to vertex pos attrib
                gl.enableVertexAttribArray(vPosAttribLoc); // connect attrib to array
                vNormAttribLoc = gl.getAttribLocation(shaderProgram, "aVertexNormal"); // ptr to vertex normal attrib
                gl.enableVertexAttribArray(vNormAttribLoc); // connect attrib to array
                
                // locate vertex uniforms
                mMatrixULoc = gl.getUniformLocation(shaderProgram, "umMatrix"); // ptr to mmat
                pvmMatrixULoc = gl.getUniformLocation(shaderProgram, "upvmMatrix"); // ptr to pvmmat
                
                // locate fragment uniforms
                var eyePositionULoc = gl.getUniformLocation(shaderProgram, "uEyePosition"); // ptr to eye position
                var lightAmbientULoc = gl.getUniformLocation(shaderProgram, "uLightAmbient"); // ptr to light ambient
                var lightDiffuseULoc = gl.getUniformLocation(shaderProgram, "uLightDiffuse"); // ptr to light diffuse
                var lightSpecularULoc = gl.getUniformLocation(shaderProgram, "uLightSpecular"); // ptr to light specular
                var lightPositionULoc = gl.getUniformLocation(shaderProgram, "uLightPosition"); // ptr to light position
                ambientULoc = gl.getUniformLocation(shaderProgram, "uAmbient"); // ptr to ambient
                diffuseULoc = gl.getUniformLocation(shaderProgram, "uDiffuse"); // ptr to diffuse
                specularULoc = gl.getUniformLocation(shaderProgram, "uSpecular"); // ptr to specular
                shininessULoc = gl.getUniformLocation(shaderProgram, "uShininess"); // ptr to shininess
                
                // pass global constants into fragment uniforms
                gl.uniform3fv(eyePositionULoc,Eye); // pass in the eye's position
                gl.uniform3fv(lightAmbientULoc,lightAmbient); // pass in the light's ambient emission
                gl.uniform3fv(lightDiffuseULoc,lightDiffuse); // pass in the light's diffuse emission
                gl.uniform3fv(lightSpecularULoc,lightSpecular); // pass in the light's specular emission
                gl.uniform3fv(lightPositionULoc,lightPosition); // pass in the light's position

        
            } // end if no shader program link errors
        } // end if no compile errors
    } // end try 
    
    catch(e) {
        console.log(e);
    } // end catch
} // end setup shaders

// render the loaded model
function renderModels() {
    
    // construct the model transform matrix, based on model state
    function makeModelTransform(currModel) {
        var zAxis = vec3.create(), sumRotation = mat4.create(), temp = mat4.create(), negCtr = vec3.create();

        // move the model to the origin
        mat4.fromTranslation(mMatrix,vec3.negate(negCtr,currModel.center)); 
        
        // scale for highlighting if needed
        if (currModel.on)
            mat4.multiply(mMatrix,mat4.fromScaling(temp,vec3.fromValues(1.2,1.2,1.2)),mMatrix); // S(1.2) * T(-ctr)
        
        // rotate the model to current interactive orientation
        vec3.normalize(zAxis,vec3.cross(zAxis,currModel.xAxis,currModel.yAxis)); // get the new model z axis
        mat4.set(sumRotation, // get the composite rotation
            currModel.xAxis[0], currModel.yAxis[0], zAxis[0], 0,
            currModel.xAxis[1], currModel.yAxis[1], zAxis[1], 0,
            currModel.xAxis[2], currModel.yAxis[2], zAxis[2], 0,
            0, 0,  0, 1);
        mat4.multiply(mMatrix,sumRotation,mMatrix); // R(ax) * S(1.2) * T(-ctr)
        
        // translate back to model center
        mat4.multiply(mMatrix,mat4.fromTranslation(temp,currModel.center),mMatrix); // T(ctr) * R(ax) * S(1.2) * T(-ctr)

        // translate model to current interactive orientation
        mat4.multiply(mMatrix,mat4.fromTranslation(temp,currModel.translation),mMatrix); // T(pos)*T(ctr)*R(ax)*S(1.2)*T(-ctr)
        
    } // end make model transform
    
    // var hMatrix = mat4.create(); // handedness matrix
    var pMatrix = mat4.create(); // projection matrix
    var vMatrix = mat4.create(); // view matrix
    var mMatrix = mat4.create(); // model matrix
    var pvMatrix = mat4.create(); // hand * proj * view matrices
    var pvmMatrix = mat4.create(); // hand * proj * view * model matrices
    
    window.requestAnimationFrame(renderModels); // set up frame render callback
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // clear frame/depth buffers
    
    // set up projection and view
    // mat4.fromScaling(hMatrix,vec3.fromValues(-1,1,1)); // create handedness matrix
    mat4.perspective(pMatrix,0.5*Math.PI,1,0.1,10); // create projection matrix
    //mat4.ortho(pMatrix, -0.5, .50, -0.50, 0.50, -0.1, 10);
    mat4.lookAt(vMatrix,Eye,Center,Up); // create view matrix
    mat4.multiply(pvMatrix,pvMatrix,pMatrix); // projection
    mat4.multiply(pvMatrix,pvMatrix,vMatrix); // projection * view
    

    // render each triangle set
    var currSet; // the tri set and its material properties
    numTriangleSets = inputTriangles.length;

    for (var whichTriSet=0; whichTriSet<numTriangleSets; whichTriSet++) {
        currSet = inputTriangles[whichTriSet];
        
        // Skip rendering if the current set is an alien and has been removed
        if (aliens.indexOf(currSet) === -1 && currSet !== spaceship) {
            continue;
        }

        // make model transform, add to view project

        makeModelTransform(currSet);
        mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
        gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
        gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix
        
        // reflectivity: feed to the fragment shader
        gl.uniform3fv(ambientULoc,currSet.material.ambient); // pass in the ambient reflectivity
        gl.uniform3fv(diffuseULoc,currSet.material.diffuse); // pass in the diffuse reflectivity
        gl.uniform3fv(specularULoc,currSet.material.specular); // pass in the specular reflectivity
        gl.uniform1f(shininessULoc,currSet.material.n); // pass in the specular exponent
        
        // vertex buffer: activate and feed into vertex shader
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffers[whichTriSet]); // activate
        gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
        gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffers[whichTriSet]); // activate
        gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed

        // triangle buffer: activate and render
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,triangleBuffers[whichTriSet]); // activate
        gl.drawElements(gl.TRIANGLES,3*triSetSizes[whichTriSet],gl.UNSIGNED_SHORT,0); // render
        
    } // end for each triangle set

    // Render bullets
    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        bullet.update();  // Update the bullet's position based on its velocity
        bullet.checkBounds();  // Remove the bullet if it's out of bounds

        console.log(bullet.alive);
        if (!bullet.alive) {
            bullets.splice(bullets.indexOf(bullet), 1);  // Remove the bullet from the array
            i--;  // Decrement the index to account for the removed bullet
            continue;
        }

        // Render the bullet
        bullet.render(gl, mMatrixULoc, pvmMatrixULoc, mMatrix, pvMatrix);
    }

} // end render model



let moveRight = []; // Direction: true = right, false = left
var recordLoopDistance = 0;
for (let i = 0; i < aliens.length; i++) {
    moveRight.push(true); // Start all aliens moving right
}

function makeyourown() {
    for(let i = 0; i < aliens.length; i++) {
        const alien = aliens[i];
        if (moveRight) {
            alien.translation[0] += 0.1; // Move right
        } else {
            alien.translation[0] -= 0.1; // Move left
        }

        // Toggle direction when certain conditions are met
    // Example: Change direction if the object reaches a boundary
    if (alien.translation[0] > 1) { // Example boundary
        moveRight = false;
    } else if (alien.translation[0] < -1) {
        moveRight = true;
    }
    }
}


function loop() {
    for (let i = 0; i < aliens.length; i++) {
        const alien = aliens[i];
        if (moveRight[i]) {
            alien.translation[0] += 0.005; // Move right
            alien.material.ambient = [1, 0, 0.5]; // change color to red
        } else {
            alien.translation[0] -= 0.005; // Move left
            alien.material.ambient = [0.5, 1, 1]; // change color to green
        }

        // Toggle direction when certain conditions are met
        if (alien.translation[0] > 0.4) { // Example boundary
            moveRight[i] = false;
        } else if (alien.translation[0] < -0.4) {
            moveRight[i] = true;
        }
    }
}
//check for the spaceship and alien collision
function checkCollision(alien, spaceship, bullet) {

    const alienPositionX = alien.center[0]+alien.translation[0]; // Alien position
    const spaceshipBulletX = spaceship !== undefined ? spaceship.center[0]+spaceship.translation[0] : bullet.center[0]; // Spaceship position
    const alienPositionY = alien.center[1]+alien.translation[1]; // Alien position
    const spaceshipBulletY = spaceship !== undefined ? spaceship.center[1]+spaceship.translation[1] : bullet.center[1]; // Spaceship position
    const dx = spaceshipBulletX - alienPositionX; // Difference in x
    const dy = spaceshipBulletY - alienPositionY; // Difference in y

    const Xdistance = Math.sqrt(dx * dx + dy * dy);

    const collisionThreshold = spaceship !== undefined ? 0.1 : 0.47; // Adjust as needed
    if(Xdistance < collisionThreshold){
        return true;
    }else{
        return false;
    }
}

function updateAlienPositions() {

    let activeAlienIndex = 0; // Track the currently active alien

    const interval = setInterval(() => {
        if (activeAlienIndex < aliens.length) {
            const alien = aliens[activeAlienIndex];
            alien.translation[1] -= 0.01; // Move down
            // check if the aliens are offset
            if (alien.translation[1] < -1.7) {
                aliens.splice(activeAlienIndex, 1);
                
                if (aliens.length===0) {
                    endGame();
                    clearInterval(interval); // Stop the interval if collision is detected
                    return; // Exit the function if collision is detected
                }
            }
            //Check for collision with the spaceship
            if (checkCollision(alien, spaceship, undefined)) {
                endGame();
                clearInterval(interval); // Stop the interval if collision is detected
                return; // Exit the function if collision is detected
            }

            activeAlienIndex++; // Move to the next alien
        } else {
            activeAlienIndex = 0; // Reset to the first alien
        }
    }, 3000); // 3-second interval
}



function endGame() {
    console.log("Game Over!");

    // Stop alien updates
    aliens = []; 
    gameOver = true;

    // Display the game-over message
    const gameOverElement = document.getElementById("gameOver");
    if (gameOverElement) {
        gameOverElement.style.display = "block"; // Make the div visible
    }
}


/* MAIN -- HERE is where execution begins after window load */

function main() {
    
    setupWebGL(); // set up the webGL environment
    setupShaders(); // setup the webGL shaders
    loadModels(); // load in the models from tri file
    renderModels(); // draw the triangles using webGL
    if (makeYourOwn) {
        setInterval(makeyourown,50);
    }else{
        setInterval(loop,50); // left and right animation
    }
    setInterval(updateAlienPositions,50); // descending animation
  
} // end main