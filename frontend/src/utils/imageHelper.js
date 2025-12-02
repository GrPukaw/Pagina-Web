// frontend/src/utils/imageHelper.js
export const getImageAsBase64 = (imagePath) => {
return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    try {
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
    } catch (e) {
        reject(e);
    }
    };
    
    img.onerror = (error) => {
    reject(error);
    };
    
    img.src = imagePath;
});
};

// Imágenes por defecto en formato Base64 (fallback)
export const defaultImages = {
logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzQ1NzFGRiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjgwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjoM8L3RleHQ+PC9zdmc+',

sello: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI3NSIgY3k9Ijc1IiByPSI3MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDU3MUZGIiBzdHJva2Utd2lkdGg9IjUiLz48Y2lyY2xlIGN4PSI3NSIgY3k9Ijc1IiByPSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDU3MUZGIiBzdHJva2Utd2lkdGg9IjMiLz48dGV4dCB4PSI1MCUiIHk9IjQ1JSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzQ1NzFGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPkNFUlRJRklDQURPPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNDU3MUZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+T0ZJQ0lBTDwvdGV4dD48L3N2Zz4=',

firma: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yMCA0MCBRIDUwIDEwLCA4MCA0MCBUIDEyMCA0MCBRIDE1MCAxMCwgMTgwIDQwIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+'
};