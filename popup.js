document.addEventListener('DOMContentLoaded', function() {
    let visitCount = getCookie('visitCount') || 0;
    visitCount++;
    setCookie('visitCount', visitCount, 365);

    if (visitCount % 1 === 0 || visitCount === 1) {
        showPopup();
    }
});

function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function showPopup() {
    document.getElementById('donationPopup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('donationPopup').classList.add('hidden');
}
