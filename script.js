document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('bookingForm');
  const qrResult = document.getElementById('qrResult');
  const qrcodeContainer = document.getElementById('qrcode');
  const downloadBtn = document.getElementById('downloadQR');
  const successMsg = document.getElementById('successMessage');

  function clearQR() {
    qrcodeContainer.innerHTML = '';
    qrResult.style.display = 'none';
    successMsg.style.display = 'none';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const members = document.getElementById('members').value.trim();
    const date = document.getElementById('date').value.trim();
    const tableNo = document.getElementById('tableNo').value.trim();

    if (!name || !mobile || !members || !date || !tableNo) {
      alert('⚠️ Please fill all fields.');
      return;
    }

    const digits = mobile.replace(/\D/g, '');
    if (digits.length < 7) {
      alert('⚠️ Please enter a valid mobile number (at least 7 digits).');
      return;
    }

    const bookingInfo = `Booking Details:\n👤 Name: ${name}\n📞 Mobile: ${mobile}\n👥 Members: ${members}\n📅 Date: ${date}\n🍽️ Table No: ${tableNo}`;

    clearQR();

    new QRCode(qrcodeContainer, {
      text: bookingInfo,
      width: 200,
      height: 200
    });

    qrResult.style.display = 'block';
    successMsg.style.display = 'block';
    successMsg.innerText = `✅ Successfully booked table #${tableNo} on ${date}`;

    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 6000);
  });

  downloadBtn.addEventListener('click', function () {
    const canvas = qrcodeContainer.querySelector('canvas');
    const img = qrcodeContainer.querySelector('img');
    let dataURL = canvas ? canvas.toDataURL('image/png') : img?.src;

    if (!dataURL) {
      alert('⚠️ QR not found. Please generate it first.');
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
