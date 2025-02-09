export function getUserDetails(data:any){
    const defaultPassword=generatePassword(20);
return {
    username: data.externalAccounts[0].emailAddress.split('@')[0], // Assuming username as email prefix
    firstName: data.externalAccounts[0].firstName,
    familyName: data.externalAccounts[0].lastName,
    email: data.emailAddresses[0].emailAddress,
    password: defaultPassword, // Placeholder since password is not provided
    confirmpassword: defaultPassword, // Placeholder for confirmation password
    imageUrl:data.externalAccounts[0].imageUrl,
    resetToken: null,
    resettokenexpire: null,
    lastpassword: [], // Assuming no previous passwords stored
}
};
function generatePassword(length: number): string {
    const hexChars = '0123456789abcdef';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = hexChars + specialChars;
    
    let password = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    
    return password;
}
