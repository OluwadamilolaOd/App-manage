export function generateProductKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let productKey = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      productKey += characters[randomIndex];
    }
    
    return productKey;
  }

  