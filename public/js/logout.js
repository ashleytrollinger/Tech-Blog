const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
        console.log('logged out')
    } else {
        alert(response.statusText);
        console.log('still logged in')
    }
};

if (document.getElementById('logout')) {
    document.getElementById('logout').addEventListener('click', logout);
}