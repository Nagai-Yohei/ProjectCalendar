categoryHtml = '<ul>'

for (let i = 0; i < Category.length; i++) {
    categoryHtml += '<li class="cat' + i + '-name">' + Category[i] + '</li>'
}
categoryHtml += '</ul>'

document.querySelector('#categoryName').innerHTML = categoryHtml
