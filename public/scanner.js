// let response = Html5Qrcode.getCameras()
//     .then((devices) => {
//         let cameraId = 0;
//         if (devices && devices.length) {
//             cameraId = devices[0].id;
//             console.log(cameraId);
//         }

//         return cameraId;
//     })
//     .then((id) => {
//         console.log(id);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// const html5QrCode = new Html5Qrcode('reader');

// html5QrCode
//     .start(
//         'a759ea82e36966c03fd82e370ad1016f2b73f8af5a51d5ca8ba4e04bf28b7917',
//         {
//             fps: 30, // Optional, frame per seconds for qr code scanning
//             qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
//         },
//         (decodedText, decodedResult) => {
//             console.log(`Code matched = ${decodedText}`, decodedResult);
//         },
//         (errorMessage) => {
//             // console.log(errorMessage);
//         }
//     )
//     .catch((err) => {
//         console.log(err);
//     });

// script.js file

function domReady(fn) {
    if (
        document.readyState === 'complete' ||
        document.readyState === 'interactive'
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

domReady(function () {
    // If found you qr code
    async function onScanSuccess(decodeText, decodeResult) {
        alert('Tanuló: ' + decodeText);
        console.log('Tanuló: ' + decodeText);
        const response = await fetch('/filebakiir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nev: decodeText }),
        });

        const data = await response.json();
        console.log(data);
    }

    let htmlscanner = new Html5QrcodeScanner('my-qr-reader', {
        fps: 10,
        qrbos: 250,
    });
    htmlscanner.render(onScanSuccess);
});
