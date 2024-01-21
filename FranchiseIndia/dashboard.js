// Assuming that 'user' is the user object retrieved from fetchUserDetails
const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main Street",
};

// Render user data on the dashboard
document.getElementById('userData').innerHTML = `
    <h3>${user.name}</h3>
    <p>Email: ${user.email}</p>
    <p>Phone: ${user.phone}</p>
    <p>Address: ${user.address}</p>
`;
