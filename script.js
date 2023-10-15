let type = 'text'; // At the top of the script.js

function changeType(newType) {
    type = newType;
    document.getElementById('text').value = '';
    document.getElementById('url').value = '';
    document.getElementById('ssid').value = '';
    document.getElementById('password').value = '';
    
    document.getElementById('text-input').style.display = 'none';
    document.getElementById('url-input').style.display = 'none';
    document.getElementById('wifi-input').style.display = 'none';

    document.getElementById(`${type}-input`).style.display = 'block';

    document.getElementById('text-btn').classList.remove('active');
    document.getElementById('url-btn').classList.remove('active');
    document.getElementById('wifi-btn').classList.remove('active');
    document.getElementById(`${type}-btn`).classList.add('active');
}

function generateQR() {

    let data;
    switch(type) {
        case 'text':
            data = document.getElementById('text').value;
            break;
        case 'url':
            data = document.getElementById('url').value;
            break;
        case 'wifi':
            const ssid = document.getElementById('ssid').value;
            const password = document.getElementById('password').value;
            const security = document.getElementById('security').value;
            data = `WIFI:T:${security};S:${ssid};P:${password};;`;
            break;
    }

    createQR(data);
}

function createQR(data) {
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = '';
    const bgColor = document.getElementById('bgcolor').value;
    const dotColor = document.getElementById('dotcolor').value;

    new QRCode(qrcodeDiv, {
        text: data,
        colorDark : dotColor,
        colorLight : bgColor
    });
}

function downloadQR(format) {
    if (format === 'png') {
        let qrcodeImage = document.querySelector('#qrcode img');
        if(qrcodeImage) {
            let imageUrl = qrcodeImage.src;
            let link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'qrcode.png';
            link.click();
        } else {
            alert('Please generate a QR code first.');
        }
    } else if (format === 'svg') {
        // SVG functionality
        // Here, you may dynamically generate SVG or use a converter. 
        // Given the library does not generate SVGs, 
        // an alternative library or a PNG to SVG converter might be necessary. 
        alert('SVG download is not supported with the current library.');
    }
}


// Initialize the correct input display
changeType('text');
