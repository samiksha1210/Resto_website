document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('bookingForm');
  const qrResult = document.getElementById('qrResult');
  const qrcodeContainer = document.getElementById('qrcode');
  const downloadBtn = document.getElementById('downloadQR');
  const successMsg = document.getElementById('successMessage');

  function clearQR() {
    qrcodeContainer.innerHTML = '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // ✅ stop page refresh

    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const members = document.getElementById('members').value.trim();
    const date = document.getElementById('date').value.trim();
    const tableNo = document.getElementById('tableNo').value.trim();

    if (!name || !mobile || !members || !date || !tableNo) {
      alert('Please fill all fields.');
      return;
    }

    // Mobile validation
    const digits = mobile.replace(/\D/g, '');
    if (digits.length < 7) {
      alert('Please enter a valid mobile number (at least 7 digits).');
      return;
    }

    const bookingInfo = `Booking Details:\nName: ${name}\nMobile: ${mobile}\nMembers: ${members}\nDate: ${date}\nTable No: ${tableNo}`;

    clearQR();

    // Generate QR
    new QRCode(qrcodeContainer, {
      text: bookingInfo,
      width: 200,
      height: 200
    });

    qrResult.style.display = 'block';

    // ✅ Show success message
    successMsg.style.display = 'block';
    successMsg.innerText = `✅ You successfully booked table no ${tableNo} on ${date}`;
  });

  // Download QR
  downloadBtn.addEventListener('click', function () {
    const canvas = qrcodeContainer.querySelector('canvas');
    const img = qrcodeContainer.querySelector('img');
    let dataURL = null;

    if (canvas) {
      dataURL = canvas.toDataURL('image/png');
    } else if (img) {
      dataURL = img.src;
    } else {
      alert('QR not found. Generate the QR first.');
      return;
    }

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'booking-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
