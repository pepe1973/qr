let response = Html5Qrcode.getCameras()
    .then((devices) => {
        let cameraId = 0;
        if (devices && devices.length) {
            cameraId = devices[0].id;
            console.log(cameraId);
        }

        return cameraId;
    })
    .then((id) => {
        console.log(id);
    })
    .catch((err) => {
        console.log(err);
    });

const html5QrCode = new Html5Qrcode('reader');

html5QrCode
    .start(
        'a759ea82e36966c03fd82e370ad1016f2b73f8af5a51d5ca8ba4e04bf28b7917',
        {
            fps: 30, // Optional, frame per seconds for qr code scanning
            qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
            console.log(`Code matched = ${decodedText}`, decodedResult);
        },
        (errorMessage) => {
            // console.log(errorMessage);
        }
    )
    .catch((err) => {
        console.log(err);
    });
