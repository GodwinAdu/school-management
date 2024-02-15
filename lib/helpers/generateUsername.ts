
interface GenerateUsernameProps{
    firstName:string
}


function generateUniqueUsername({firstName}:GenerateUsernameProps) {
    const cleanFirstName = firstName.toLowerCase();
    
    // Combine and remove spaces
    const fullName = (cleanFirstName ).replace(/\s/g, '');
  
    // Generate a random suffix of length 3
    const randomSuffix = Array.from({ length: 3 }, () =>
      String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    ).join('');
  
    // Combine name and random suffix
    const username = fullName + randomSuffix;
  
    return username;
  }
 