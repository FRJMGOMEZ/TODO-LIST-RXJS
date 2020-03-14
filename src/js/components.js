

import '../css/components.css';

export const sayHi = (name) => {
    console.log('CREATING H1');
    const h1 = document.createElement('h1');
    h1.innerText = `Hi ${name} how are you?`;
    document.body.appendChild(h1);

}