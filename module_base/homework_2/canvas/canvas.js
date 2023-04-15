const input = document.getElementById('input');
input.addEventListener('change', handleFileChange);


function handleFileChange(e) {
    const canvasObj = createCanvases();
    const img = new Image();

    img.onload = () => {
        drawImage(img, canvasObj.canvas_1, canvasObj.ctx_1);
        drawImage(img, canvasObj.canvas_2, canvasObj.ctx_2);

        addButtonListeners(canvasObj);
    };

    img.src = URL.createObjectURL(e.target.files[0]);
};

// canvas
function createCanvases() {
    const canvas_1 = document.getElementById('canvas_1');
    const canvas_2 = document.getElementById('canvas_2');
    const ctx_1 = canvas_1.getContext('2d');
    const ctx_2 = canvas_2.getContext('2d');
    canvas_1.width = 640;
    canvas_2.width = 640;

    return {
        canvas_1,
        canvas_2,
        ctx_1,
        ctx_2,
    };
};

function drawImage(img, canvas, ctx) {
    let width = canvas.width;
    let natWidth = img.naturalWidth;
    let natHeight = img.naturalHeight;
    let aspect = natWidth / natHeight;
    let height = width / aspect;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);
}

// filters
function grayscale(data) {
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i+1] + data[i+2]) / 3;
        data[i] = avg;
        data[i+1] = avg;
        data[i+2] = avg;
    }
};

const inverse = (data) => {
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] ^ 255;
        data[i+1] = data[i+1] ^ 255;
        data[i+2] = data[i+2] ^ 255;
    }
};

function applyFilter(canvasObj, filter) {
    const canvas = canvasObj.canvas_1;
    const ctx_1 = canvasObj.ctx_1;
    const ctx_2 = canvasObj.ctx_2
    const imgData = ctx_1.getImageData(0,0,canvas.width,canvas.height);
    const data = imgData.data;
    switch(filter) {
        case 'grayscale':
            grayscale(data);
            break;
        case 'inverse':
            inverse(data);
            break;
        default: break;
    }
    ctx_2.putImageData(imgData, 0, 0);
};

// listeners
function addButtonListeners(canvasObj) {
    const grayscaleBtn = document.getElementById('grayscale_btn');
    const inverseBtn = document.getElementById('inverse_btn');
    grayscaleBtn.addEventListener('click', () => applyFilter(canvasObj, 'grayscale'));
    inverseBtn.addEventListener('click', () => applyFilter(canvasObj, 'inverse'));
};
