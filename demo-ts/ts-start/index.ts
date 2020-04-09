let div = document.createElement('div');
div.style.border = '1px solid red';
div.style.height = '100px';
div.style.width = '100px';
div.id = 'demo';
div.style.position = 'relative'

document.body.appendChild(div);

document.onmousemove = (e) => {
  div.style.top = e.clientY + 'px';
  div.style.left = e.clientX + 'px';
};
